TETRIS.registerModule('game-loop', function(sb){

	var _animID;
	var _lastRenderTime, _lastUpdateTime, _delta, _currentTime;
	var _fps = 1000/15;
	var _ups = 1000/30;
	var _isPaused = false;
	var _gameState = '';

	var _loop = function(){

		_currTime = (new Date()).getTime();

		switch(_gameState){
			case "IS_PLAYING":
				_delta = _currTime - _lastUpdateTime;
				if(_delta > _ups) {
					// UPDATE
					sb.publishEvent('game-update');
					_lastUpdateTime = _currTime;
				}
				break;
		}

		_delta = _currTime - _lastRenderTime;
		if(_delta > _fps) {
			// RENDER
			sb.clearCanvas();
			sb.publishEvent('game-render');
			_lastRenderTime = _currTime;
		}

		_animID = window.requestAnimationFrame(_loop);
		
	};

	var _onGameStateChange =  function(state){
		switch(state) {
			case 'game-play':
			case 'game-resume':
				_gameState = 'IS_PLAYING';
				break;
			case 'game-pause':
				_gameState = 'IS_PAUSED';
				break;
		}
	};

	var _init = function(){
		_lastRenderTime = _lastUpdateTime = (new Date()).getTime();
		sb.subscribeEvent('game-stateChange', _onGameStateChange);
		if(!_animID) window.requestAnimationFrame(_loop);
	};

	var _destroy = function(){
		if(_animID) window.cancelAnimationFrame(_animID);
	};

	return {
		init: _init,
		destroy: _destroy
	};
});