var tank = Object.create(gameobject);

tank.draw = function(delta) {
    
    this.updatePosition(delta);
    
    this.drawer.draw(this);
};

tank.updatePosition = function(delta) {

};
