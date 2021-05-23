"use strict";


var webSocketsServerPort = 1337;

// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');


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
    httpServer: server
});


var connection = [];
var game = false;
//
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    console.log((new Date()) + ' Connection accepted.');
    connection = connection || [];
    if (!game) {
	connection.push(request.accept(null, request.origin)); 
    } ;   
    if (connection.length == 2) {
        game = true;
	connection[0].sendUTF( JSON.stringify({player: 'X'}));
	connection[1].sendUTF( JSON.stringify({player: 'O'}));
    };
    
    // user sent some message
    connection.on('message', function(message) {
        for (var i = connection.length - 1; i >= 0; i--) {
            connection[i].sendUTF(message);
        };
    });
    // user disconnected
    connection.on('close', function(connection) {
        });

});
//
//
//

//
//var send = function(res, data){
//	headers = {
//		'Content-type': 'application/json',
//		'Access-Control-Allow-Headers': 'Content-type',
//		'Access-Control-Allow-Origin': '*'
//	}
//	message = JSON.stringify(data);
//	headers['Contnent-length'] = message.length;
//	
//	res.writeHead(200, headers);
//	res.end(message);
//}
//
//var on_request = function(request,response){
////        console.log(response);
//	var body = '';
//	if (request.method != 'POST') {
//		send(response, null);
//		return;
//	}
//	request.on('data', function (data) {
//		body += data;
//	});
//	request.on('end', function(){
//		
//}
//
//var http = require('http').createServer(on_request).listen(8080);
