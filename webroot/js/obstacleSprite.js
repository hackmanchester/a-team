/**
 * Sprite Base Object
 */
var ObstacleSprite = {  
    imageSrc: 'imgs/obstacles.png',
    image: null,
    width: 40,
    height: 40,

    init: function() {
        this.image = new Image();
        this.image.src = this.imageSrc;
    },
    
    
    draw: function(delta, obstacle) {
        if (this.image == null) {
            this.init();
        }

        var sourceX = obstacle.kind * this.width;
        var sourceY = 0;
        
        var context = GameManager.context;

        context.drawImage(
            this.image, sourceX, sourceY,
            this.width, this.height,
            obstacle.x, obstacle.y,
            this.width, this.height);
    }

}
