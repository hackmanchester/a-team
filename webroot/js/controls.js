// Client
$(function(){
    var controller_id = 'blah';
    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {
        $('#status').html('You are connected to the socket.');
    });

    var _emitControlEvent = function(socket, button, state) {
        socket.emit('control', {
            type: $(button).parent().data('type'),
            direction: $(button).data('direction'),
            state: state
        });
    }
    // Move events
    $('input[type=button]').mousedown(function(){
        _emitControlEvent(socket, this, 'start');
    });

    // Shoot events
    $('input[type=button]').mouseup(function(){
        _emitControlEvent(socket, this, 'stop');
    });

    socket.emit('join-control', {
        controller_id: controller_id
        // send team? display?
    });
});