GAME_CORE.registerModule("game-loop", function(sb){

	var _animID;
	var _lastRenderTime, _lastUpdateTime, _delta, _currentTime;
	var _fps = 1000/30;
	var _ups = 1000/30;

	var _update = function(){
		sb.update();
	};

	var _render = function(){
		sb.render();
	};

	var _loop = function(){
		_currTime = (new Date()).getTime();

		_delta = _currTime - _lastUpdateTime;
		if(_delta > _ups) {
			_update();
			_lastUpdateTime = _currTime;
		}

		_delta = _currTime - _lastRenderTime;
		if(_delta > _fps) {
			_render();
			_lastRenderTime = _currTime;
		}

		_animID = window.requestAnimationFrame(_loop);
	};

	var _init = function(){
		_lastRenderTime = _lastUpdateTime = (new Date()).getTime();
		if(!_animID) window.requestAnimationFrame(_loop);
	};

	var _destroy = function(){
		console.log("Destroyed");
		if(_animID) window.cancelAnimationFrame(_animID);
	};

	return {
		init: _init,
		destroy: _destroy
	};
});