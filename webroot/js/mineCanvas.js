var MineCanvas = {
	draw: function(mine) {
		GameManager.context.fillStyle="#00FF00";
		GameManager.context.fillRect(mine.x, mine.y, 10, 10);
	}
}