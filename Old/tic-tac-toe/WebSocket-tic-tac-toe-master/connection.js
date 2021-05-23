Connection = function(){
    var game_callback = function(){};
    var timeout = 2;
    var last_command = null;
    var last_value = null;
    var self = this;

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        return;
    }

    // open connection
    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        // first we want users to enter their names
 
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        Game.message('There is a problem with the connection. Reconnect in ' + timeout + ' seconds');
	window.setTimeout(function(){
            Game.message('Reconnecting...');
            self.send(last_command, last_value, game_callback);
	},timeout * 1000);
	if (timeout < 10) {
            timeout += 1;
        } 
    };

    // most important part - incoming messages
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        game_callback(JSON.parse(message.data));
	// reset the timeout to default
	timeout = 1;
    };

    this.send = function(command, value, callback) {
        last_command = command;
        last_value = value;
        game_callback = callback;
        data = {
            room: 'test',
            command: command,
            value: value
        };
        connection.send(JSON.stringify(data));
    };
	
    this.stop = function(){
        connection.close();
    };
};