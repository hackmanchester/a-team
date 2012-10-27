// Server
var io = require('socket.io').listen(9000);

io.sockets.on('connection', function (client) {
	
	// Listen for movements
	client.on('control', function(data) {
		console.log(data);
	});

	// Listen for shooting
	client.on('shoot', function(data) {
		console.log(data);
	});

});