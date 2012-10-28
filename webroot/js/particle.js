var Particle = Object.create(GameObject);
Particle.colour = '#ffffff';
Particle.size = 5;
Particle.range = 100;
Particle.draw = function(delta) {
    this.updatePosition(delta);
    this.range -= Math.abs(this.vector.x) * delta * this.speed * 0.02;
    this.range -= Math.abs(this.vector.y) * delta * this.speed * 0.02;
    
    var context = GameManager.context;
    
    context.fillStyle = this.colour;
    context.fillRect(this.x, this.y, this.size, this.size);
    if (this.range <= 0) {
        return false;
    }
    return true;
}