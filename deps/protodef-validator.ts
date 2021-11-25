/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

import Ajv from "./ajv.ts";
import {
	definitions,
	protocol,
	numeric,
	utils,
	structures,
	conditional,
	primitives,
} from "./protodef/index.ts";
import { ok } from "./assert.ts";

export default class Validator {
	typesSchemas: Record<string, unknown> = {};
	compiled = false;
	ajv: Ajv = new Ajv();
	constructor(typesSchemas?: Record<string, unknown>) {
		this.createAjvInstance(typesSchemas);
		this.addDefaultTypes();
	}

	createAjvInstance(typesSchemas?: Record<string, unknown>) {
		this.typesSchemas = {};
		this.compiled = false;
		this.ajv = new Ajv({ verbose: true });
		this.ajv.addSchema(definitions, "definitions");
		this.ajv.addSchema(protocol, "protocol");
		if (typesSchemas) {
			for (const key in typesSchemas) {
				this.addType(key, typesSchemas[key] as Record<string, unknown>);
			}
		}
	}

	addDefaultTypes() {
		this.addTypes(numeric);
		this.addTypes(utils);
		this.addTypes(structures);
		this.addTypes(conditional);
		this.addTypes(primitives);
	}

	addTypes(schema: Record<string, unknown>) {
		for (const name in schema) {
			this.addType(name, schema[name] as Record<string, unknown>);
		}
	}

	typeToSchemaName(name: string) {
		return name.replace("|", "_");
	}

	addType(name: string, schema?: Record<string, unknown>) {
		const schemaName = this.typeToSchemaName(name);
		if (this.typesSchemas[schemaName] != undefined) return;

		if (!schema) {
			// default schema
			schema = {
				oneOf: [
					{ enum: [name] },
					{
						type: "array",
						items: [
							{ enum: [name] },
							{ oneOf: [{ type: "object" }, { type: "array" }] },
						],
					},
				],
			};
		}

		this.typesSchemas[schemaName] = schema;

		// recreate ajv instance to recompile dataType (and all depending types) when adding a type
		if (this.compiled) {
			this.createAjvInstance(this.typesSchemas);
		} else {
			this.ajv.addSchema(schema, schemaName);
		}

		this.ajv.removeSchema("dataType");
		this.ajv.addSchema(
			{
				title: "dataType",
				oneOf: [{ enum: ["native"] }].concat(
					// @ts-ignore - Typescript errors
					Object.keys(this.typesSchemas).map((name) => ({
						$ref: this.typeToSchemaName(name),
					}))
				),
			},
			"dataType"
		);
	}

	validateType(type: unknown) {
		const valid = this.ajv.validate("dataType", type);
		this.compiled = true;
		if (!valid) {
			console.log(JSON.stringify(this.ajv.errors?.[0], null, 2));
			if (this.ajv.errors?.[0]?.["parentSchema"]?.["title"] == "dataType") {
				this.validateTypeGoingInside(this.ajv.errors?.[0]?.["data"] as string);
			}
			throw new Error("validation error");
		}
	}

	validateTypeGoingInside(type: string) {
		if (Array.isArray(type)) {
			// @ts-ignore - Linting issue
			ok(
				this.typesSchemas[this.typeToSchemaName(type[0])] != undefined,
				type + " is an undefined type"
			);

			const valid = this.ajv.validate(type[0], type);
			this.compiled = true;
			if (!valid) {
				console.log(JSON.stringify(this.ajv.errors?.[0], null, 2));
				if (this.ajv.errors?.[0]?.["parentSchema"]?.["title"] == "dataType") {
					this.validateTypeGoingInside(
						this.ajv.errors?.[0]?.["data"] as string
					);
				}
				throw new Error("validation error");
			}
		} else {
			if (type == "native") return;
			// @ts-ignore - Linting issueexampleProtocol
			ok(
				(this.typesSchemas[this.typeToSchemaName(type)] !=
					undefined) as boolean,
				(type + " is an undefined type") as string
			);
		}
	}

	validateProtocol(protocol: Record<string, unknown>) {
		// 1. validate with protocol schema with basic datatype def
		const valid: boolean = this.ajv.validate("protocol", protocol);
		// @ts-ignore - Linting issue
		ok(valid, JSON.stringify(this.ajv.errors, null, 2));

		// 2. recursively create several validator from current one and validate that
		function validateTypes(
			p: unknown,
			originalValidator: Validator,
			path: string
		) {
			const v = new Validator(originalValidator.typesSchemas);
			Object.keys(p as Record<string, unknown>).forEach((k) => {
				if (k == "types") {
					// 2 steps for recursive types
					// @ts-ignore - Typing errors
					Object.keys(p[k]).forEach((typeName) => v.addType(typeName));
					// @ts-ignore - Typing errors
					Object.keys(p[k]).forEach((typeName) => {
						try {
							// @ts-ignore - Typing errors
							v.validateType(p[k][typeName], path + "." + k + "." + typeName);
						} catch {
							throw new Error("Error at " + path + "." + k + "." + typeName);
						}
					});
				} else {
					// @ts-ignore - Typing errors
					validateTypes(p[k], v, path + "." + k);
				}
			});
		}
		validateTypes(protocol, this, "root");
	}
}
