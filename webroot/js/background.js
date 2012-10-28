/**
 * Sprite Base Object
 */
var Background = {  
    imageSrc: 'imgs/terrain.png',
    image: null,
    tileWidth: 40,
    tileHeight: 40,
    canvas: null,
    context: null,
    
    init: function() {
        _.bindAll(this);
        this.image = new Image();
        this.canvas = $('#background');
        this.context = this.canvas[0].getContext('2d');
        this.image.onload = this.draw;
        this.image.src = this.imageSrc;
    },
    
    draw: function() {
        for (var x = 0; x < GameManager.width / this.tileWidth; x++) {
            for (var y = 0; y < GameManager.height / this.tileHeight; y++) {
                sourceX = Math.round(Math.random() * 3) * this.tileWidth;
                sourceY = Math.round(Math.random() * 3) * this.tileHeight;
                this.context.drawImage(               
                    this.image, 
                    sourceX, 
                    sourceY, 
                    this.tileWidth, this.tileHeight, 
                    x * this.tileWidth, y * this.tileHeight,
                    this.tileWidth, this.tileHeight);
            }
        } 
    }
}
