$(function(){
	var socket = io.connect(
		'http://'+window.location.hostname+':9000/'
	);
	socket.on('connect', function () {});

	console.log('Display Loaded');
});