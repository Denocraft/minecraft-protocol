/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

import { EventEmitter } from '../deps/events.ts';
import States from './states.ts';

export default class Client extends EventEmitter {
	public latency = 0;
	public state: States = States.HANDSHAKING;
	private ended = true;
	private packetsToParse: Record<string, unknown> = {};

	// TODO: Implement types
	private compressor = null;
	private cipher = null;
	private decipher = null;
	private decompressor = null;
	private closeTimer = null;
	private splitter = null;
	private framer = null;

	constructor(
		public isServer: boolean,
		public version: string,
		private customPackets: unknown[],
		private hideErrors = false
	) {
		super();
		// this.splitter = framing.createSplitter();
		// this.framer = framing.createFramer();
	}

	end(reason: string) {
		return reason;
	}

	write(name: string, params: Record<string, unknown> | string) {
		return { name, params };
	}
}
