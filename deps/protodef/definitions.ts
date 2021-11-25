/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

export default {
	title: "definitions",
	definitions: {
		contextualizedFieldName: {
			type: "string",
			pattern: "^(this\\.)?.+$",
		},
		dataTypeArgsCount: {
			oneOf: [
				{
					$ref: "#/definitions/contextualizedFieldName",
				},
				{
					type: "number",
				},
			],
		},
		fieldName: {
			type: "string",
			pattern: "^[a-zA-Z0-9_]+$",
		},
	},
	type: "object",
};
