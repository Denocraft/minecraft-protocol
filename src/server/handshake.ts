/**
 * Minecraft-Protocol
 * 
 * A port of node-minecraft-protocol to Deno
 * ported by Blocks_n_more
 */
import Client from "../client.ts";
import Server from "../server.ts";

export default function (client: Client, _server: Server, {
    kickTimeout = 30 * 1000,
    checkTimeoutInterval = 4 * 1000,
    keepAlive: enableKeepAlive = true
  }) {
    let keepAlive = false
    let lastKeepAlive: number | null = null
    let keepAliveTimer: number;
    let sendKeepAliveTime: number;
  
    function keepAliveLoop () {
      if (!keepAlive) { return }
  
      // check if the last keepAlive was too long ago (kickTimeout)
      const elapsed = Date.now() - (lastKeepAlive ?? 0);
      if (elapsed > kickTimeout) {
        client.end('KeepAliveTimeout')
        return
      }
      sendKeepAliveTime = Date.now()
      client.write('keep_alive', {
        keepAliveId: Math.floor(Math.random() * 2147483648)
      })
    }
  
    function onKeepAlive () {
      if (sendKeepAliveTime) client.latency = Date.now() - sendKeepAliveTime
      lastKeepAlive = Date.now();
    }
  
    function startKeepAlive () {
      keepAlive = true
      lastKeepAlive = Date.now();
      keepAliveTimer = setInterval(keepAliveLoop, checkTimeoutInterval)
      client.on('keep_alive', onKeepAlive)
    }
  
    if (enableKeepAlive) {
      client.on('state', state => {
        if (state === 'play') {
          startKeepAlive()
        }
      })
    }
  
    client.on('end', () => clearInterval(keepAliveTimer))
  }