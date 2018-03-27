var WebSocketServer = require('requireg')('ws').Server,
wss = new WebSocketServer({port: 8181});

wss.broadcast = function(data) {
    for (var i in this.clients)
        this.clients[i].send(data);
};

wss.on('connection', function(ws) {
    console.log('client connected');
    ws.on('message', function(message) {
        wss.broadcast(message);
        console.log(message);
    });
});
