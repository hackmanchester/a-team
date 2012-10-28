/**
 * Sprite Base Object
 */
var TankSprite = {  
    imageSrc: 'imgs/tank.png',
    image: null,
    width: 41,
    height: 41,
    
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

        var sourceX = state[0] * this.width;
        var sourceY = state[1] * this.height;
        
        var context = GameManager.context;

        context.drawImage(
            this.image, sourceX, sourceY,
            this.width, this.height,
            tank.x, tank.y,
            this.width, this.height);
            
        context.fillStyle = '#FF0000';
        context.fillRect(tank.x, tank.y-8, this.width, 5);
        if (tank.hp > 0) {
            context.fillStyle = '#00FF00';
            context.fillRect(tank.x, tank.y-7, this.width * tank.hp / Tank.hp, 3);
        }
        context.fillStyle = '#FFFFFF';
        context.textAlign = "center";
        context.font = "bold 12px sans-serif";
        var dk = 0;
        if (GameManager.score[tank.owner].kills) {
            dk = GameManager.score[tank.owner].kills - GameManager.score[tank.owner].deaths;
        }
        context.fillText(
            tank.owner + ' (' + dk + ')', tank.x + this.width / 2, tank.y+this.height+10
        );

        var back = Background.context 
        back.globalCompositeOperation = 'darken';
        back.globalAlpha = 0.01;
        back.fillStyle = '#ff0000';
        back.fillRect(tank.x, tank.y, this.width, this.height);
        
    }

}
