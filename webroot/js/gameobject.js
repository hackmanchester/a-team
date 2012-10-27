/**
 * Game manager, stores entities, handles events, draws game
 */
var GameObject = {
    id: null,
    x: 0,
    y: 0,
    speed: 0,
    vector: {
        x: 0, 
        y: 0
    },
    
    drawer: null,
    
    init: function() {
        _.bindAll(this);
    },
    
    draw : function(delta) {
        
    },
    
    updatePosition: function(delta) {
        this.x += this.vector.x * delta * this.speed * 0.02;
        this.y += this.vector.y * delta * this.speed * 0.02;
    },
    getId: function() {
        this.id = Math.random()+'';
    }
}
