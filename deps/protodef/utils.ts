/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

export default {
	pstring: {
		title: "pstring",
		type: "array",
		items: [
			{
				enum: ["pstring"],
			},
			{
				oneOf: [
					{
						type: "object",
						properties: {
							countType: {
								$ref: "dataType",
							},
							encoding: {
								type: "string",
							},
						},
						additionalProperties: false,
						required: ["countType"],
					},
					{
						type: "object",
						properties: {
							count: {
								$ref: "definitions#/definitions/dataTypeArgsCount",
							},
							encoding: {
								type: "string",
							},
						},
						additionalProperties: false,
						required: ["count"],
					},
				],
			},
		],
		additionalItems: false,
	},
	buffer: {
		title: "buffer",
		type: "array",
		items: [
			{
				enum: ["buffer"],
			},
			{
				oneOf: [
					{
						type: "object",
						properties: {
							countType: {
								$ref: "dataType",
							},
						},
						additionalProperties: false,
						required: ["countType"],
					},
					{
						type: "object",
						properties: {
							count: {
								$ref: "definitions#/definitions/dataTypeArgsCount",
							},
						},
						additionalProperties: false,
						required: ["count"],
					},
				],
			},
		],
	},
	bitfield: {
		title: "bitfield",
		type: "array",
		items: [
			{
				enum: ["bitfield"],
			},
			{
				type: "array",
				items: {
					type: "object",
					properties: {
						name: {
							$ref: "definitions#/definitions/fieldName",
						},
						size: {
							type: "number",
						},
						signed: {
							type: "boolean",
						},
					},
					required: ["name", "size", "signed"],
					additionalProperties: false,
				},
				additionalItems: false,
			},
		],
		additionalItems: false,
	},
	mapper: {
		title: "mapper",
		type: "array",
		items: [
			{
				enum: ["mapper"],
			},
			{
				type: "object",
				properties: {
					type: {
						$ref: "dataType",
					},
					mappings: {
						type: "object",
						patternProperties: {
							"^[-a-zA-Z0-9 _]+$": {
								type: "string",
							},
						},
						additionalProperties: false,
					},
				},
				required: ["type", "mappings"],
				additionalProperties: false,
			},
		],
		additionalItems: false,
	},
};
