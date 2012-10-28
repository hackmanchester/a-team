var MineCanvas = {
	draw: function(mine) {
        context = GameManager.context;
		context.fillStyle="#183a0d";
		//context.fillRect(mine.x, mine.y, 10, 10);
        context.beginPath();
        context.arc(mine.x, mine.y, 8, 0, Math.PI*2, true); 
        context.closePath();
        context.fill();
        
        context.fillStyle="#4b1313";
        context.beginPath();
        context.arc(mine.x, mine.y, 3, 0, Math.PI*2, true); 
        context.closePath();
        context.fill();

	}
}