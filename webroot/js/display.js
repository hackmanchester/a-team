// Client
$(function(){

	var socket = io.connect(
		'http://'+window.location.hostname+':9000/'
	);

	socket.on('connect', function () {
		$('#status').html('You are connected to the socket.');

		$('input[type=button]').mousedown(function(){
			socket.emit('control', $(this).attr('id') +'_start');
		})
		$('input[type=button]').mouseup(function(){
			socket.emit('control', $(this).attr('id') +'_stop');
		})
	});

	console.log('Display Loaded');
});