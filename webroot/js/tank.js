var Tank = Object.create(GameObject);

Tank.draw = function(delta) {
    
    this.updatePosition(delta);
    
    this.drawer.draw(this);
};

Tank.updatePosition = function(delta) {

};
