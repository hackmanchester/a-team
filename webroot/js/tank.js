var Tank = Object.create(GameObject);

Tank.speed = 10;

Tank.sprite = null;
Tank.hp = 10;
Tank.draw = function(delta) {
    if (this.disabled) {
    	return false;
    }

    if (this.hp == 0) {
        var explosion = Object.create(Explosion);
        explosion.x = this.x + 20;
        explosion.y = this.y + 20;
        explosion.start();
        return false;
    }
    if (this.sprite == null) {
        this.sprite = Object.create(TankSprite);
    }
 
    this.updatePosition(delta);
    this.sprite.draw(delta, this);   
    return true;
};


