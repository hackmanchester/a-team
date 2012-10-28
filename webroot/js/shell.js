var Shell = Object.create(GameObject);

Shell.speed = 40;

Shell.draw = function(delta) {
	this.updatePosition(delta);
	this.drawer.draw(this);
};
