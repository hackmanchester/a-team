/**
 * Game manager, stores entities, handles events, draws game
 */
var GameObject = {
    x: 0,
    y: 0,
    
    vector: {
        x: 0, 
        y: 0
    },
    
    drawer: null,
    
    init: function() {
        _.bindAll(this);
    },
    
    draw : function(delta) {
        
    }
    
}
