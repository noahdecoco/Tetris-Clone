GAME_CORE.registerModule('sigil', function(sb){

	var _types = [
		// L
		[
			[0],[0],[0],[0],
			[0],[1],[0],[0],
			[0],[1],[0],[0],
			[0],[1],[1],[0]
		]
	];

	var _cellSize = 20;
	var _x = 0, _y = 0;
	var _speed = 1.8;
	var _tempY = 0;

	var _currSigil = _types[0];
	var _row = 4;

	var _draw = function() {
		for(var i = 0; i < _currSigil.length; i++){
			var x = _x + (Math.floor(i%_row) * _cellSize);
			var y = _y + (Math.floor(i/_row) * _cellSize);
			if(_currSigil[i][0] === 1) {
				sb.drawRect(x,y,_cellSize,_cellSize,'#99ff00');
			} else {
				sb.drawRect(x,y,_cellSize,_cellSize,'#eeeeee');
			}
		}
	};

	var _update = function() {
		_tempY += _speed;
		if(_tempY >= _cellSize){
			_tempY = 0;
			// _y += _cellSize;
		}
	};

	var _move = function(dir) {
		console.log("sigil moving " + dir);
		switch(dir) {
			case 'right':
				_x += _cellSize;
				break;
			case 'left':
				_x -= _cellSize;
				break;
			case 'down':
				_y += _cellSize;
				break;
		}
	};

	var _rotate = function() {
		var temp = [];
		temp.length = _currSigil.length;
		for (var i = 0; i < _currSigil.length; i++){
			var x = i % _row;
			var y = Math.floor(i/_row);
			var newX = _row - y - 1;
			var newY = x;
			var newIndex = newY * _row + newX;
			temp[newIndex] = _currSigil[i];
		}
		_currSigil = temp;
	};
	
	var _init = function(){
		sb.subscribeEvent("move-sigil", _move);
		sb.subscribeEvent("rotate-sigil", _rotate);
		sb.subscribeEvent("render", _draw);
		sb.subscribeEvent("update", _update);
	};

	var _destroy = function(){
		
	};

	return {
		init: _init,
		destroy: _destroy
	};
});