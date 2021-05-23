Connection = function(){
	var xhr = new XMLHttpRequest();
	var url = 'http://localhost:8080';
	var game_callback = function(){};
	var timeout = 2;
	var last_command = null;
	var last_value = null;
	var self = this;
	
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			game_callback(JSON.parse(xhr.responseText));
			// reset the timeout to default
			timeout = 1;
		}
	}
	xhr.onerror = function()
	{
		console.log('There is a problem with the connection. Reconnect in ' + timeout + ' seconds');
	}
	this.send = function(command, value, callback) {
		last_command = command;
		last_value = value;
		game_callback = callback;
		data = {
			command: command,
			value: value
		}
		xhr.open('POST', url);
		xhr.send(JSON.stringify(data));
	}
	
	this.stop = function(){
		xhr.abort();
	}
}
