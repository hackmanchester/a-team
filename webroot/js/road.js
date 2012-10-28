/**
 * Sprite Base Object
 * Do not read this code please :)
 */
var Road = {  
    imageSrc: 'imgs/roads.png',
    image: null,
    width: 30,
    height: 30,
    currentDir : 'down',
    distance : Math.round(Math.random() * 5) + 1,
    x : Math.floor(Math.random() * GameManager.width / 30),
    y : 0,
    parts : {
        'horizontal' : [0,0],
        'vertical' : [1,0],
        'down-right' : [0,1],
        'down-left' : [1,1],
        'up-right' : [0,2],
        'up-left' : [1,2]
    },
    currentPart: 'vertical',
    
    init: function() {
         _.bindAll(this);
        this.image = new Image();
        this.image.onload = this.draw;
        this.image.src = this.imageSrc;
    },
    
    
    draw: function(delta) {
        if (this.image == null) {
            this.init();
        }
        var horTiles = GameManager.width / this.width;
        var verTiles = GameManager.height / this.height;
        var context = Background.context;
        while(
            this.x <= horTiles && this.x >= 0 
            && this.y <= verTiles && this.y >= 0
        ) {
            var sourceX = this.parts[this.currentPart][0] * this.width; 
            var sourceY = this.parts[this.currentPart][1] * this.height;  
            context.drawImage(
                this.image, sourceX, sourceY,
                this.width, this.height,
                this.x * this.width, this.y * this.height,
                this.width, this.height); 
                
            switch(this.currentDir) {
                case 'down':
                    this.y += 1;
                    break;
                case 'up':
                    this.y -= 1;
                    break;
                case 'left':
                    this.x -= 1;
                    break;
                case 'right':
                    this.x += 1;
                    break;                    
            }
            this.distance -= 1;
            if (this.distance <= 0) {
                this.distance = Math.round(Math.random() * 5) + 1;
                var nextDir = '';
                var turnPart = '';
                switch(this.currentDir) {
                    case 'down':
                    case 'up':
                        nextDir = Math.random() > 0.5 ? 'left' : 'right';
                        turnPart = this.currentDir + '-' + nextDir;
                        this.currentPart = 'horizontal';
                        break;
                    case 'left':
                    case 'right':
                        nextDir = Math.random() > 0.5 ? 'up' : 'down';
                        switch(nextDir) {
                            case 'up' :
                                turnPart = 'down' + '-' + (this.currentDir == 'left' ? 'right' : 'left');
                                break;
                            case 'down': 
                                turnPart = 'up' + '-' + (this.currentDir == 'left' ? 'right' : 'left');
                                break;
                        } 

                        this.currentPart = 'vertical';
                        break;  
                }
                this.currentDir = nextDir;
                
                sourceX = this.parts[turnPart][0] * this.width; 
                sourceY = this.parts[turnPart][1] * this.height;  
                context.drawImage(
                    this.image, sourceX, sourceY,
                    this.width, this.height,
                    this.x * this.width, this.y * this.height,
                    this.width, this.height);
                    
                switch(this.currentDir) {
                    case 'down':
                        this.y += 1;
                        break;
                    case 'up':
                        this.y -= 1;
                        break;
                    case 'left':
                        this.x -= 1;
                        break;
                    case 'right':
                        this.x += 1;
                        break;                    
                }
                
            }
        }

        
    }

}
