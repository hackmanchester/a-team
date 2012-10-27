// Client
$(function(){
    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {
        $('#status').html('You are connected to the socket.');

        // Move events
        $('input[type=button]').mousedown(function(){
            socket.emit('control', {
                type:$(this).parent().data('type'),
                direction:$(this).attr('id'),
                state:'start'
            });
        })

        // Shoot events
        $('input[type=button]').mouseup(function(){
            socket.emit('control', {
                type:$(this).parent().data('type'),
                direction:$(this).attr('id'),
                state:'stop'
            });
        })
    });
});