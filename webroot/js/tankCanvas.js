/**
 * Game manager, stores entities, handles events, draws game
 */
var tankCanvas = {
    
    draw : function(tank) {
        gamemanager.context.fillStyle="#FF0000";
        gamemanager.context.fillRect(tank.x, tank.y, 10, 10);
    }
    
    
}
