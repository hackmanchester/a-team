var ShellCanvas = {
	draw: function(shell) {
		GameManager.context.fillStyle="#00ff00";
        GameManager.context.fillRect(shell.x, shell.y, 5, 5);
	}
}