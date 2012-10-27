// Server
var io = require('socket.io').listen(9000);

io.sockets.on('connection', function (client) {
	console.log('moo');
	client.on('control', function(data) {
		console.log(data);
	});

});