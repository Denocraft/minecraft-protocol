/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

export default {
	bool: {
		enum: ["bool"],
	},
	cstring: {
		items: [
			{
				enum: ["cstring"],
			},
			{
				type: "object",
				properties: {
					encoding: {
						type: "string",
					},
				},
				additionalProperties: false,
				required: [],
			},
		],
		additionalItems: false,
	},
	void: {
		enum: ["void"],
	},
};
