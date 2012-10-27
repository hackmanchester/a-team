// Client
$(function(){
    var controller_id = Math.random()+'';
    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {
        $('#status').html('Game on bro!');
    });

    var _emitControlEvent = function(socket, div, state, data) {
        socket.emit('control', {
            type: $(div).data('type') ? $(div).data('type') : data.type,
            action: $(div).data('action') ? $(div).data('action') : data.action,
            state: state
        });
    }
    // Move events
    $('div[data-type=move]').mousedown(function(){
        _emitControlEvent(socket, this, 'start');

    }).bind('mouseup', function() {
        _emitControlEvent(socket, this, 'stop');
    });

    $(document).keydown(function(e) {
        var keyCode = e.keyCode || e.which,
        arrow = {left: 37, up: 38, right: 39, down: 40, z: 122, x: 120 };
        switch (keyCode) {
            case arrow.left:
                _emitControlEvent(socket, {}, 'start', {type:"move",action:"left"});
            break;
            case arrow.up:
                _emitControlEvent(socket, {}, 'start', {type:"move",action:"up"});
            break;
            case arrow.right:
                _emitControlEvent(socket, {}, 'start', {type:"move",action:"right"});
            break;
            case arrow.down:
                _emitControlEvent(socket, {}, 'start', {type:"move",action:"down"});
            break;
            case arrow.z:
                _emitControlEvent(socket, {}, 'start', {type:"shoot",action:"bullet"});
            break;
            case arrow.x:
                _emitControlEvent(socket, {}, 'start', {type:"shoot",action:"mine"});
            break;
        }
    });

    // Shoot events
    $('div[data-type=shoot]').mousedown(function(){
        _emitControlEvent(socket, this, 'start');
    }).bind('mouseup', function() {
        _emitControlEvent(socket, this, 'stop');
    });

    socket.emit('join-control', {
        // send team? display?
        controller_id: controller_id
    });
});