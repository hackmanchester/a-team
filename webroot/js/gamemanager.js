/**
 * Game manager, stores entities, handles events, draws game
 */
var GameManager = {
    
    objects : {},
    particles: {},
    canvas: null, 
    context: null,
    width: 600,
    height: 500,
    
    init : function(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        _.bindAll(this);
    },

        
    /**
     * Draw the current state of the game, 
     * delta is the time passed since the last frame
     */
    draw: function(delta) {
        this.context.clearRect(0, 0, this.width, this.height);
        for (i in this.objects) {
            this.objects[i].draw(delta);
        }
        for (i in this.particles) {
            if (!this.particles[i].draw(delta)) {
                delete(this.particles[i]);
            }
        }
    },
    
    addObject: function(gameObject) {
        this.objects[gameObject.id] = gameObject;
    },
    
    addParticle: function(gameObject) {
        this.particles[gameObject.id] = gameObject;
    }, 
    
    bindEvents: function() {

    },

    moveTank: function(tank) {
        this.objects[tank.id].vector = tank.vector;
        this.objects[tank.id].orientation = tank.orientation;
        this.objects[tank.id].x = tank.x;
        this.objects[tank.id].y = tank.y;
    }
    
}
