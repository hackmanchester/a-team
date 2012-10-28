// Client
$(function(){
    sfx_bullet = new Audio("/sounds/laser.mp3");
    sfx_mine = new Audio("/sounds/boom.mp3");

    // Get the username
    $('#submitbutton').click(function(e){

/*        // Check there's a username
        if ($('#username').val() == '') {
            alert('Please enter a username.');
            e.preventDefault();
            return false;
        }*/

        var controller_id = $('#username').val(); //Math.random()+'';
        var mouseIsDown = false;
        var mouseIsUp = true;
        var socket = io.connect(
            'http://'+window.location.hostname+':9000/'
        );

        socket.on('connect', function () {
            
            var _emitControlEvent = function(socket, div, state, data) {
                var type = $(div).data('type') ? $(div).data('type') : data.type;
                var action = $(div).data('action') ? $(div).data('action') : data.action;

                socket.emit('control', {
                    type: type,
                    action: action,
                    state: state
                });

                if (type == 'shoot' && state == 'start') {
                   
                    if (action == 'bullet') {
                            sfx_bullet.play();
                            sfx_bullet.currentTime = 0;
                    }

                    if (action == 'mine') {
                            sfx_mine.play();
                            sfx_mine.currentTime = 0;
                    }
                }
            }

            // Move events
            $('div[data-type=move]').mousedown(function(){
                if (mouseIsUp) {
                    mouseIsUp = false;
                    mouseIsDown = true;
                    _emitControlEvent(socket, this, 'start');
                    $(this).css({ opacity: 0.5, background: "#333" });
                }
                
            }).bind('mouseup mouseleave', function() {
                if (mouseIsDown) {
                    _emitControlEvent(socket, this, 'stop');
                    mouseIsDown = false;
                    mouseIsUp = true;
                    $(this).css('background','transparent');
                }
            });

            $(document).keypress(function(e){
                var keycode = (e.keyCode ? e.keyCode : e.which);
                switch (keycode) {
                    case 97: //a
                        _emitControlEvent(socket, {}, 'start', {type: 'move', action: 'left'})
                        break;
                    case 119: //w
                        _emitControlEvent(socket, {}, 'start', {type: 'move', action: 'up'})
                        break;
                    case 100: //d
                        _emitControlEvent(socket, {}, 'start', {type: 'move', action: 'right'})
                        break;
                    case 115: //s
                        _emitControlEvent(socket, {}, 'start', {type: 'move', action: 'down'})
                        break;
                    case 110://n
                        _emitControlEvent(socket, {}, 'start', {type: 'shoot', action: 'bullet'})
                        break;
                    case 109: //m
                        _emitControlEvent(socket, {}, 'start', {type: 'shoot', action: 'mine'})
                        break;

                }
            }).bind('keyup', function(e){
                var keycode = (e.keyCode ? e.keyCode : e.which);
                switch (keycode) {
                    case 65: //a
                        _emitControlEvent(socket, {}, 'stop', {type: 'move', action: 'left'})
                        break;
                    case 87: //w
                        _emitControlEvent(socket, {}, 'stop', {type: 'move', action: 'up'})
                        break;
                    case 68: //d
                        _emitControlEvent(socket, {}, 'stop', {type: 'move', action: 'right'})
                        break;
                    case 83: //s
                        _emitControlEvent(socket, {}, 'stop', {type: 'move', action: 'down'})
                        break;
                    case 78://n
                        _emitControlEvent(socket, {}, 'start', {type: 'shoot', action: 'bullet'})
                        break;
                    case 77: //m
                        _emitControlEvent(socket, {}, 'start', {type: 'shoot', action: 'mine'})
                        break;                        
                }
            });            
            
            // Shoot events
            $('div[data-type=shoot]').mousedown(function(){
                _emitControlEvent(socket, this, 'start');
                mouseIsDown = true;
                $(this).css({ opacity: 0.5, background: "#333" });
            }).bind('mouseup mouseleave', function() {
                if (mouseIsDown) {
                    _emitControlEvent(socket, this, 'stop');
                    mouseIsDown = false;
                    $(this).css('background','transparent');
                }
            });

            // respawn
            $('div[data-type=respawn]').mousedown(function(){
                _emitControlEvent(socket, this, 'start');
                 mouseIsDown = true;
                $(this).css({ opacity: 0.5, background: "#333" });
            }).bind('mouseup mouseleave', function() {
                if (mouseIsDown) {
                    _emitControlEvent(socket, this, 'stop');
                    mouseIsDown = false;
                    $(this).css('background','transparent');
                }
            });

            socket.emit('join-control', {
                controller_id: controller_id
            });    

            $('#controller').show();  
            $('#name').hide(); 
            $('#cont_head').hide(); 

           
        });

    });
    
});