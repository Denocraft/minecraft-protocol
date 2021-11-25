/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

export default {
	i8: {
		enum: ["i8"],
	},
	u8: {
		enum: ["u8"],
	},
	i16: {
		enum: ["i16"],
	},
	u16: {
		enum: ["u16"],
	},
	i32: {
		enum: ["i32"],
	},
	u32: {
		enum: ["u32"],
	},
	f32: {
		enum: ["f32"],
	},
	f64: {
		enum: ["f64"],
	},
	li8: {
		enum: ["li8"],
	},
	lu8: {
		enum: ["lu8"],
	},
	li16: {
		enum: ["li16"],
	},
	lu16: {
		enum: ["lu16"],
	},
	li32: {
		enum: ["li32"],
	},
	lu32: {
		enum: ["lu32"],
	},
	lf32: {
		enum: ["lf32"],
	},
	lf64: {
		enum: ["lf64"],
	},
	i64: {
		enum: ["i64"],
	},
	li64: {
		enum: ["li64"],
	},
	u64: {
		enum: ["u64"],
	},
	lu64: {
		enum: ["lu64"],
	},
	varint: {
		enum: ["varint"],
	},
	int: {
		title: "int",
		type: "array",
		items: [
			{
				enum: ["int"],
			},
			{
				type: "array",
				items: {
					type: "object",
					properties: {
						size: {
							type: "number",
						},
					},
					required: ["size"],
					additionalProperties: false,
				},
				additionalItems: false,
			},
		],
		additionalItems: false,
	},
	lint: {
		title: "lint",
		type: "array",
		items: [
			{
				enum: ["lint"],
			},
			{
				type: "array",
				items: {
					type: "object",
					properties: {
						size: {
							type: "number",
						},
					},
					required: ["size"],
					additionalProperties: false,
				},
				additionalItems: false,
			},
		],
		additionalItems: false,
	},
};
