var Obstacle = Object.create(GameObject);

Obstacle.speed = 0;
Obstacle.kind = 0;
Obstacle.kinds = 2;
Obstacle.sprite = null;
Obstacle.type = 'Obstacle';
Obstacle.draw = function(delta) {
    if (this.sprite == null) {
        this.sprite = Object.create(ObstacleSprite);
    }
    this.sprite.draw(delta, this);   
    return true;
};


