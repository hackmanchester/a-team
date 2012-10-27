// Client
$(function(){
    var controller_id = 'blah';
    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {
        $('#status').html('Game on bro!');
    });

    var _emitControlEvent = function(socket, div, state) {
        socket.emit('control', {
            type: $(div).data('type'),
            action: $(div).data('action'),
            state: state
        });
    }
    // Move events
    $('div[data-type=move]').mousedown(function(){
        _emitControlEvent(socket, this, 'start');
    });
    $('div[data-type=move]').mouseup(function(){
        _emitControlEvent(socket, this, 'stop');
    });

    // Shoot events
    $('div[data-type=shoot]').mousedown(function(){
        _emitControlEvent(socket, this, 'start');
    });
    $('div[data-type=shoot]').mouseup(function(){
        _emitControlEvent(socket, this, 'stop');
    });

    socket.emit('join-control', {
        controller_id: controller_id
        // send team? display?
    });
});