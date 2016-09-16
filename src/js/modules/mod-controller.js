GAME_CORE.registerModule("game-controller", function(sb){

	var _keyDownListener = function(e){
		switch (e.keyCode) {
			case 37:
			console.log('left');
			break;
			case 38:
			console.log('up');
			break;
			case 39:
			console.log('right');
			break;
			case 40:
			console.log('down');
			break;
			case 32:
			console.log('slam');
			break;
		}
		window.removeEventListener("keydown", _keyDownListener);
		window.addEventListener("keyup", _keyUpListener);
	};

	var _keyUpListener = function(){
		window.addEventListener("keydown", _keyDownListener);
		window.removeEventListener("keyup", _keyUpListener);
	};

	var _init = function(){
		window.addEventListener("keydown", _keyDownListener);
	};

	var _destroy = function(){
		
	};

	return {
		init: _init,
		destroy: _destroy
	};
});