GAME_CORE.registerModule('game-keeper', function(sb){

	var _score = 0, _level = 1, _clearedRows = 0, _diffTreshhold = 5, _gamePaused = false;

	var _updateGame = function(){
		_score += 101;
		document.getElementById('score').innerHTML = "Score: " + _score;
		_clearedRows ++;
		if(_level != Math.floor(_clearedRows/_diffTreshhold)+1) {
			_level = Math.floor(_clearedRows/_diffTreshhold)+1;
			document.getElementById('level').innerHTML = "Level: " + _level;
			sb.publishEvent("level-up");
		}
	};

	var _init = function(){
		sb.subscribeEvent("row-cleared", _updateGame);
		document.getElementById('btn-togglePlay').addEventListener('click', function(e){
			_gamePaused = !_gamePaused;
			if(_gamePaused) {
				e.currentTarget.innerHTML = "PLAY";
			} else {
				e.currentTarget.innerHTML = "PAUSE";
			}
			sb.publishEvent("toggle-pause", [_gamePaused]);
		});
	};

	var _destroy = function(){

	};

	return {
		init: _init,
		destroy: _destroy
	};
});