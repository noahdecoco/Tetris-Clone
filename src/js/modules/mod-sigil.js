GAME_CORE.registerModule('sigil', function(sb){

	var _types = [
		// L
		[
			[0],[1],[0],[0],
			[0],[1],[0],[0],
			[0],[1],[0],[0],
			[0],[1],[0],[0]
		]
	];

	var _cellSize = 40;
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
				sb.drawRect(x,y,_cellSize,_cellSize,'#52bbae');
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
				if(_isEmptyBeside(_cellSize)) _x += _cellSize;
				break;
			case 'left':
				if(_isEmptyBeside(-_cellSize)) _x -= _cellSize;
				break;
			case 'down':
				if(_isEmptyBelow(_cellSize)) _y += _cellSize;
				break;
		}
	};

	var _rotate = function() {
		var temp = [];
		var i = 0;
		temp.length = _currSigil.length;
		// if(!_isEmptyBelow(0)) return false;
		for (i = 0; i < _currSigil.length; i++){
			var x = i % _row;
			var y = Math.floor(i/_row);
			var newX = _row - y - 1;
			var newY = x;
			var newIndex = newY * _row + newX;
			temp[newIndex] = _currSigil[i];
		}
		_currSigil = temp;
		// Reposition if out of bounds
		_restrictToBounds();
	};

	var _restrictToBounds = function(){
		for (i = 0; i < _currSigil.length; i++){
			var x = _x + (Math.floor(i%_row) * _cellSize);
			var y = _y + (Math.floor(i/_row) * _cellSize);
			if(x < 0 && _currSigil[i] == 1) _x += x*-1;
			if(x >= 400 && _currSigil[i] == 1) _x += x - (400 + _cellSize);
			if(y >= 600 && _currSigil[i] == 1) _y += y - (600 + _cellSize);
		}
	};

	var _isEmptyBeside = function(offset){
		for (i = 0; i < _currSigil.length; i++){
			var x = _x + (Math.floor(i%_row) * _cellSize) + offset;
			console.log(x);
			if((x < 0 && _currSigil[i] == 1) || (x >= 400 && _currSigil[i] == 1)) {
				// TODO: Check for other pieces
				return false;
			}
		}
		return true;
	};

	var _isEmptyBelow = function(offset){
		for (i = 0; i < _currSigil.length; i++){
			var y = _y + (Math.floor(i/_row) * _cellSize) + offset;
			if(y >= 600 && _currSigil[i] == 1) {
				// TODO: Check for other pieces
				return false;
			}
		}
		return true;
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