var connections = {};
var games = {};
//var url = require('url');

// Port where we'll run the websocket server
var webSocketsServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');

var send = function(res, data){
/*	headers = {
		'Content-type': 'application/json',
		'Access-Control-Allow-Headers': 'Content-type',
		'Access-Control-Allow-Origin': '*'
	} */
	message = JSON.stringify(data);
//	headers['Contnent-length'] = message.length;
	
        res.sendUTF(message);
//	res.end(message);
};

/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});

/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});

// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
        var connection = request.accept(null, request.origin); 
    	var body = '';
	if (request.method != 'POST') {
		send(connection, null);
		return;
	}
	request.on('data', function (data) {
		body += data;
	});
	request.on('end', function(){
		var params = JSON.parse(body);
	
		var room = params.room;
		connections[room] = connections[room] || [];
		games[room] = games[room] || false;
		if (params.command == 'init') {
			if (connections[room].length == 1) {
				games[room] = true;
				send(connections[room][0], {player: 1});
				send(connection, {player: 2});
				return;
			}
			if (games[room]) {
				send(connection, {player: -1});
			}
		}
		// received command other than init, so game must be started
		games[room] = true; 
		if (params.command == 'set') {
			for (var i = connections[room].length -1; i >= 0; i--) {
				res = connections[room][i];
				send(res, params);
				connections[room].splice(i,1);
			}
		}
		connections[room].push(connection);
    });


});