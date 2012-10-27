// Client
$(function(){
    var controller_id = Math.random()+'';
    var mouseIsDown = false;
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
        mouseIsDown = true;
    }).bind('mouseup mouseleave', function() {
        if (mouseIsDown) {
            _emitControlEvent(socket, this, 'stop');
            mouseIsDown = false
        }
    });

    // Shoot events
    $('div[data-type=shoot]').mousedown(function(){
        _emitControlEvent(socket, this, 'start');
        mouseIsDown = true;
    }).bind('mouseup mouseleave', function() {
        if (mouseIsDown) {
            _emitControlEvent(socket, this, 'stop');
            mouseIsDown = false;
        }
        _emitControlEvent(socket, this, 'stop');
    });

    socket.emit('join-control', {
        // send team? display?
        controller_id: controller_id
    });
});