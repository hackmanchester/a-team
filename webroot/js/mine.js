var Mine = Object.create(GameObject);

Mine.type = 'mine';
Mine.draw = function(delta) {
	this.drawer.draw(this);
    return true;
}