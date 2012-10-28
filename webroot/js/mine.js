var Mine = Object.create(GameObject);

Mine.draw = function(delta) {
	this.drawer.draw(this);
}