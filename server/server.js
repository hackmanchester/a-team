var io = require('socket.io').listen(9000);
io.set('log level', 2);

var microtime = require('microtime');

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
    var time = null;
    var _controlTankOwnedBy = function(owner, data) {
        var tank = _getTankByOwner(owner);
        // set vector for movement

        if (data.state == 'stop') {
            // @TODO: Move this code into setTimeout
            // Save tank's x and y after move is done
            var delta = (microtime.now() - time)/1000;
            tank.updatePosition(delta);

            // Stop tank
            tank.vector = {x:0, y:0};
        } else {
            time = microtime.now();
            tank.vector = _vectorConvert(data.action);
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