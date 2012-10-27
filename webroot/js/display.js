// Client
$(function(){
    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );

    socket.on('connect', function () {});
    socket.emit('load');
    socket.on('load', function(data){
        for (var i = data.objects.length - 1; i >= 0; i--) {
            GameManager.objects = data.objects;
        };
        // Receive bunch of data and populate map with tanks
        gameloop();
    });
});