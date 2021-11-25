/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

import Ajv from "./ajv-polyfill.ts";
import {
	definitions,
	protocol,
	numeric,
	utils,
	structures,
	conditional,
	primitives,
} from "./protodef/index.ts";

export default class Protodef {
	typesSchemas: Record<string, unknown> = {};
	compiled = false;
	ajv: Ajv = new Ajv();
	constructor(typesSchemas: Record<string, unknown>) {
		this.createAjvInstance(typesSchemas);
		this.addDefaultTypes();
	}

	createAjvInstance(typesSchemas: Record<string, unknown>) {
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

	addType(name: string, schema: Record<string, unknown>) {}
}
