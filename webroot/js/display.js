$(function(){
    var socket = io.connect(
        'http://'+window.location.hostname+':9000/'
    );
    socket.on('connect', function () {});
    socket.emit('load');

    socket.on('load', function(){
        // Receive bunch of data and populate map with tanks
    });

    console.log('Display Loaded');
});