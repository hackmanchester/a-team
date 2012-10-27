/**
 * Game manager, stores entities, handles events, draws game
 */
var TankCanvas = {
    
    draw : function(tank) {
        GameManager.context.fillStyle="#FF0000";
        GameManager.context.fillRect(tank.x, tank.y, 10, 10);
    }
    
    
}
