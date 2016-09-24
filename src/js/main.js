TETRIS.initGame('game-canvas', 300, 600, 30);

TETRIS.initModule('game-loop');
TETRIS.initModule('grid');
TETRIS.initModule('sigil');
TETRIS.initModule('game-controller');
TETRIS.initModule('game-keeper');


var btnStart = document.getElementById('btn-start');
btnStart.addEventListener("click", function(e){
	e.currentTarget.classList.add("hidden");
	TETRIS.startGame();
});