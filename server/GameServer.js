const WebSocket = require("ws");

class GameServer {
    constructor({ port }) {
        this.port = port;
        this.wss = new WebSocket.Server({ port });

        this.wss.on('connection', this.onConnection.bind(this));

        console.log("Running on port: " + port);
    }

    onConnection(ws) {
        console.log("Connection established");
    }
}

new GameServer({ port: 8080 });