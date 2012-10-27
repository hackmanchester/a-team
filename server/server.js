var io = require('socket.io').listen(9000);
io.set('log level', 5);


var controllers = {};
io.sockets.on('connection', function (socket) {
    // Send everyone's position to bootstrap client
    socket.on('load', function() {
        console.log('Client connected, send map to them');
    });

    socket.on('join-control', function(data){
        // associate controller with tank
        controllers[socket.id] = data.controller_id;
        // Spawn tank on battlefield
        // Send update event to everyone
    });

    // Main event distribution event =D
    socket.on('tank', function(data) {
        socket.broadcast.event('tank', data);
    });

    var _controlTankOwnedBy = function(owner, data) {
        console.log(
            owner +"'s tank "+data.state+" "+data.type+" "+data.direction
        );
    }

    // Listen for controller
    socket.on('control', function(data) {
        if (controllers[socket.id]) {
            _controlTankOwnedBy(controllers[socket.id], data);
        }
    });
});