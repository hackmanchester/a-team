var io = require('socket.io').listen(9000);
io.set('log level', 5);

io.sockets.on('connection', function (socket) {
    // Send everyone's position to bootstrap client
    socket.on('load', function() {
        console.log('Client connected, send map to them');
    });

    // Main event distribution event =D
    socket.on('tank', function(data) {
        socket.broadcast.event('tank', data);
    });

    // Listen for controller
    socket.on('control', function(data) {
        console.log(data);
    });
});