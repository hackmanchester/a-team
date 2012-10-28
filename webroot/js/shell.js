var Shell = Object.create(GameObject);

Shell.speed = 40;
Shell.range = 500;

Shell.draw = function(delta) {
	this.updatePosition(delta);
    this.range -= Math.abs(this.vector.x) * delta * this.speed * 0.02;
    this.range -= Math.abs(this.vector.y) * delta * this.speed * 0.02;
	this.drawer.draw(this);
    
    if (this.range <= 0) {
        return false;
    }
    return true;
};
