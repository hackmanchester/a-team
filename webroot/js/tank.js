var Tank = Object.create(GameObject);

Tank.speed = 10;

Tank.draw = function(delta) {
    
    this.updatePosition(delta);

    this.drawer.draw(this);
};


