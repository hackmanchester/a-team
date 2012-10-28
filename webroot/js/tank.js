var Tank = Object.create(GameObject);

Tank.speed = 10;

Tank.sprite = null;
Tank.draw = function(delta) {
    if (this.sprite == null) {
        this.sprite = Object.create(TankSprite);
    }
 
    this.updatePosition(delta);
   this.sprite.draw(delta, this);
    
};


