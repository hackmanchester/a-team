var tank = _.extend(gameobject, {
    
    draw: function(delta) {
        gamemanager.context.fillStyle="#FF0000";
        gamemanager.context.fillRect(this.x,this.y,10,10);
    }
    
});