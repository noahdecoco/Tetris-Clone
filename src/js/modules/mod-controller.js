GAME_CORE.registerModule('game-controller', function(sb){

	var _gamePaused = false;

	var _keyDownListener = function(e){
		switch (e.keyCode) {
			case 37:
			sb.publishEvent('move-sigil', ['left']);
			break;
			case 38:
			sb.publishEvent('rotate-sigil');
			break;
			case 39:
			sb.publishEvent('move-sigil', ['right']);
			break;
			case 40:
			sb.publishEvent('move-sigil', ['down']);
			break;
			case 32:
			// sb.publishEvent('rotate-sigil');
			// sb.publishEvent('slam');
			break;
		}
		// sb.removeEventListener(window, 'keydown', _keyDownListener);
		// sb.addEventListener(window, 'keyup', _keyUpListener);
	};

	var _keyUpListener = function(){
		sb.addEventListener(window, 'keydown', _keyDownListener);
		sb.removeEventListener(window, 'keyup', _keyUpListener);
	};

	var _togglePause = function(isPaused){
		_isPaused = isPaused;
		if(_isPaused) {
			sb.removeEventListener(window, 'keydown', _keyDownListener);
		} else {
			sb.addEventListener(window, 'keydown', _keyDownListener);
		}
	};
	
	var _init = function(){
		sb.addEventListener(window, 'keydown', _keyDownListener);
		sb.subscribeEvent("toggle-pause", _togglePause);
	};

	var _destroy = function(){
		sb.removeEventListener(window, 'keydown', _keyDownListener);
		sb.removeEventListener(window, 'keyup', _keyUpListener);
	};


	return {
		init: _init,
		destroy: _destroy
	};
});