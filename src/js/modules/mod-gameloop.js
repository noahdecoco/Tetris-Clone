TETRIS.registerModule('game-loop', function(sb){

	var _animID;
	var _lastRenderTime, _lastUpdateTime, _delta, _currentTime;
	var _fps = 1000/15;
	var _ups = 1000/30;
	var _isPaused = false;

	var _loop = function(){

		_currTime = (new Date()).getTime();

		switch(sb.getGameState()){
			case "IS_PLAYING":

				_delta = _currTime - _lastUpdateTime;
				if(_delta > _ups) {
					// UPDATE
					sb.publishEvent('game-update');
					_lastUpdateTime = _currTime;
				}

				_delta = _currTime - _lastRenderTime;
				if(_delta > _fps) {
					// RENDER
					sb.clearCanvas();
					sb.publishEvent('game-render');
					_lastRenderTime = _currTime;
				}
				break;

			case "IS_PAUSED":
				break;

			case "IS_STOPPED":
				break;

			case "IS_OVER":
				_delta = _currTime - _lastRenderTime;
				if(_delta > _fps) {
					// RENDER
					sb.clearCanvas();
					sb.publishEvent('game-render');
					_lastRenderTime = _currTime;
				}
				break;
		}
		_animID = window.requestAnimationFrame(_loop);
		
	};

	var _init = function(){
		_lastRenderTime = _lastUpdateTime = (new Date()).getTime();
		if(!_animID) window.requestAnimationFrame(_loop);
	};

	var _start = function(){
	};

	var _destroy = function(){
		if(_animID) window.cancelAnimationFrame(_animID);
	};

	return {
		init: _init,
		destroy: _destroy
	};
});