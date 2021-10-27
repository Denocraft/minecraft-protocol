/**
 * Minecraft-Protocol
 *
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */

enum States {
	HANDSHAKING = 'handshaking',
	STATUS = 'status',
	LOGIN = 'login',
	PLAY = 'play',
}

export default States;
