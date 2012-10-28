/**
 * Sprite Base Object
 */
var TankSprite = {  
    imageSrc: 'imgs/tank.png',
    image: null,
    width: 40,
    height: 40,
    
    states: {
        up: [[0, 0], [1, 0]],
        left: [[0, 1], [1, 1]],
        down: [[0, 2], [1, 2]],
        right: [[0, 3], [1, 3]]
    },
    
    time:0,
    
    frameTime:100,
    currentFrame: 0,
    
    init: function() {
        this.image = new Image();
        this.image.src = this.imageSrc;
    },
    
    
    draw: function(delta, tank) {
        if (this.image == null) {
            this.init();
        }
        if (tank.vector.x != 0 || tank.vector.y != 0) {
            this.time += delta;
        }
        if (this.time > this.frameTime) {
            this.currentFrame = this.currentFrame ? 0 : 1;
            this.time = 0;
        }
        var state = this.states[tank.facing][this.currentFrame];

        sourceX = state[0] * this.width + 1;
        sourceY = state[1] * this.height + 1;
        console.log(sourceX + ':' + sourceY);
        GameManager.context.drawImage(
            this.image, sourceX, sourceY,
            this.width, this.height,
            tank.x, tank.y,
            this.width, this.height);
    }

}
