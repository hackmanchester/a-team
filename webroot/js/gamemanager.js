/**
 * Game manager, stores entities, handles events, draws game
 */
var gamemanager = {
    
    objects : [],
    canvas: null, 
    context: null,
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
        for (i in this.objects) {
            this.objects[i].draw(delta);
        }
    },
    
    addObject: function(gameObject) {
        gameObject.init();
        this.objects.push(gameObject);
    }
    
}
