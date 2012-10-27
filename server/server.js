var io = require('socket.io').listen(9000);
io.set('log level', 5);

// Import external files
var fs = require('fs');
var vm = require('vm');
var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);
includeInThisContext('../webroot/js/gameobject.js');
includeInThisContext('../webroot/js/tank.js');

var _vectorConvert = function(direction) {
    switch(direction) {
        case 'up':
            return {x:0, y:-1};
        case 'down':
            return {x:0, y:1};
        case 'left':
            return {x:-1, y:0};
        case 'right':
            return {x:1, y:0};
    }
}

var controllers = {};
var ownerTanks = {};
var objects = {};
io.sockets.on('connection', function (socket) {
    // Send everyone's position to bootstrap client
    socket.on('load', function() {
        console.log('Client connected, send map to them');
        socket.emit('load', {objects: objects});
    });

    socket.on('join-control', function(data){
        // associate controller with tank
        controllers[socket.id] = data.controller_id;

        // Spawn tank on battlefield
        var tank = Object.create(Tank);
        tank.getId();
        tank.owner = data.controller_id;
        ownerTanks[data.controller_id] = tank.id;
        tank.x = 10;
        tank.y = 10;

        objects[tank.id] = tank;

        // Send update event to everyone
        socket.broadcast.emit('createTank', {
            object: tank
        });
    });

    // Main event distribution event =D
    socket.on('tank', function(data) {
        socket.broadcast.event('tank', data);
    });

    var _getTankByOwner = function(owner) {
        return objects[ownerTanks[owner]];
    }

    var _controlTankOwnedBy = function(owner, data) {
        var tank = _getTankByOwner(owner);
        // set vector for movement
        tank.vector = _vectorConvert(data.direction);

        if (data.state == 'stop') {
            tank.vector = {x:0, y:0};
        }

        socket.broadcast.emit('moveTank', {
            object: tank
        });

        console.log(
            owner +"'s tank "+data.state+" "+data.type+" "+ data.action
        );
    }

    // Listen for controller
    socket.on('control', function(data) {
        if (controllers[socket.id]) {
            _controlTankOwnedBy(controllers[socket.id], data);
        }
    });
});