TETRIS.registerModule('game-keeper', function(sb){

	var _score = 0, _level = 1, _clearedRows = 0, _diffTreshhold = 5;

	var _updateGame = function(numRows){
		_score += 101 * numRows + ((numRows-1)*101);
		console.log(_score, numRows);
		document.getElementById('score').innerHTML = "Score: " + _score;
		_clearedRows ++;
		if(_level != Math.floor(_clearedRows/_diffTreshhold)+1) {
			_level = Math.floor(_clearedRows/_diffTreshhold)+1;
			document.getElementById('level').innerHTML = "Level: " + _level;
			sb.publishEvent("level-up");
		}
	};

	var _onGameStateChange =  function(state){
		switch(state) {
			case 'game-reset':
				_score = 0;
				_level = 1;
				_clearedRows = 0;
				document.getElementById('score').innerHTML = "Score: " + _score;
				document.getElementById('level').innerHTML = "Level: " + _level;
				break;
		}
	};

	var _init = function(){
		sb.subscribeEvent("row-cleared", _updateGame);
		sb.subscribeEvent('game-stateChange', _onGameStateChange);
	};

	var _destroy = function(){

	};

	return {
		init: _init,
		destroy: _destroy
	};
});