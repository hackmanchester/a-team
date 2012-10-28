var Explosion = {
    x : 0, 
    y: 0,
    particles: {},
    start: function() {
        var count = 2000;
        var angle = (Math.PI * 2) / count;
        for (var i = 0; i <= count; i++) {           
            GameManager.addParticle(this.createParticle(i, angle));
            console.log(this.createParticle(i, angle));
        }
    }, 
    createParticle : function(count, angle) {
        var particle = Object.create(Particle);
        particle.x = this.x;
        particle.y = this.y;
        particle.speed = Math.floor(Math.random() * 8) + 8;
        particle.colour = '#'+Math.floor(Math.random()*16777215).toString(16);
        particle.range = Math.floor(Math.random() * 50) + 200;
        particle.size = Math.floor(Math.random() * 5) + 2;
        var particleAngle = count * angle;
        particle.vector = {
            x: Math.cos(particleAngle),
            y: Math.sin(particleAngle)
        };
        var d = new Date();
        particle.id = 'p' + d.getTime();
        return particle;
    }
}