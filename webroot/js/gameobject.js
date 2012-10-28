/**
 * Game manager, stores entities, handles events, draws game
 */
var GameObject = {
    id: null,
    x: 0,
    y: 0,
    speed: 0,
    facing: 'up',
    type: 'GameObject',
    vector: {
        x: 0, 
        y: 0
    },
    orientation: {
        x: 0,
        y: -1
    },
    disabled: false,
    
    drawer: null,
    
    init: function() {
        _.bindAll(this);
    },
    
    draw : function(delta) {
        
    },
    
    predictPosition: function(delta) {
        return {
            x: this.vector.x * delta * this.speed * 0.02;
            y: this.vector.y * delta * this.speed * 0.02;
        };
    },

    updatePosition: function(delta) {
        this.x += this.vector.x * delta * this.speed * 0.02;
        this.y += this.vector.y * delta * this.speed * 0.02;
        
        if (this.vector.x !== 0 || this.vector.y !== 0) {
            if (this.vector.x == 1) {
                this.facing = 'right';                
            } else if (this.vector.x == -1) {
                this.facing = 'left';
            } else if (this.vector.y == 1) {
                this.facing = 'down';
            } else {
                this.facing = 'up';
            }
        }
    },
    getId: function() {
        this.id = this.type + '-' + Math.random();
    }
}
