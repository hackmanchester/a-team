var ShellCanvas = {
	draw: function(shell) {
		GameManager.context.fillStyle="#0000FF";
        GameManager.context.fillRect(shell.x, shell.y, 5, 5);
	}
}