/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

export default {
	title: "protocol",
	type: "object",
	properties: {
		types: {
			type: "object",
			patternProperties: {
				"^[0-9a-zA-Z_]+$": {
					oneOf: [
						{
							type: "string",
						},
						{
							type: "array",
							items: [
								{
									type: "string",
								},
								{
									oneOf: [
										{
											type: "object",
										},
										{
											type: "array",
										},
									],
								},
							],
						},
					],
				},
			},
			additionalProperties: false,
		},
	},
	patternProperties: {
		"^(?!types)[a-zA-Z_]+$": {
			$ref: "#",
		},
	},
	additionalProperties: false,
};
