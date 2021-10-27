/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

import { EventEmitter } from '../deps/events.ts';

export default class Server extends EventEmitter {
	public closeTimeout = 30 * 1000;
	constructor(
		public isServer: boolean,
		public version: string,
		private customPackets: unknown[],
		private hideErrors = false
	) {
		super();
	}
}
