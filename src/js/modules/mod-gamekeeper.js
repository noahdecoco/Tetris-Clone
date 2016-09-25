TETRIS.registerModule('game-keeper', function(sb){

	var _score = 0, _level = 1, _clearedRows = 0, _diffTreshhold = 5;

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
	};

	var _destroy = function(){

	};

	return {
		init: _init,
		destroy: _destroy
	};
});