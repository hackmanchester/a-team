var Mine = Object.create(GameObject);

Mine.type = 'mine';
Mine.draw = function(delta) {
	if (this.disabled) {
		return false;
	}

	this.drawer.draw(this);
    return true;
}