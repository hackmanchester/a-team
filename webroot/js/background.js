/**
 * Sprite Base Object
 */
var Background = {  
    imageSrc: 'imgs/terrain.png',
    image: null,
    tileWidth: 41,
    tileHeight: 41,
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
                this.context.drawImage(this.image, x * this.tileWidth, y * this.tileHeight);
            }
        } 
    }
}
