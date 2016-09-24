TETRIS.registerModule('sigil', function(sb){

	var _types = [
		/*[ // FATSO
			[0],[0],[0],[0],
			[0],[0],[0],[0],
			[1],[1],[1],[1],
			[1],[1],[1],[1]
		]*/
		[ // L
			[0],[1],[0],[0],
			[0],[1],[0],[0],
			[0],[1],[1],[0],
			[0],[0],[0],[0]
		],
		[ // L reverse
			[0],[0],[1],[0],
			[0],[0],[1],[0],
			[0],[1],[1],[0],
			[0],[0],[0],[0]
		],
		[ // []
			[0],[0],[0],[0],
			[0],[1],[1],[0],
			[0],[1],[1],[0],
			[0],[0],[0],[0]
		],
		[ // T
			[0],[0],[0],[0],
			[1],[1],[1],[0],
			[0],[1],[0],[0],
			[0],[0],[0],[0]
		],
		[ // |
			[0],[1],[0],[0],
			[0],[1],[0],[0],
			[0],[1],[0],[0],
			[0],[1],[0],[0]
		],
		[ // S
			[0],[0],[1],[0],
			[0],[1],[1],[0],
			[0],[1],[0],[0],
			[0],[0],[0],[0]
		],
		[ // Z
			[0],[1],[0],[0],
			[0],[1],[1],[0],
			[0],[0],[1],[0],
			[0],[0],[0],[0]
		]
	];

	var _cellSize, _x, _y;
	var _speed = 2;
	var _tempY = 0;
	var _row = 4;

	var _currSigil, _nextSigil = _types[Math.floor(Math.random()*_types.length)];

	var _draw = function() {
		if(!_currSigil) return;
		for(var i = 0; i < _currSigil.length; i++){
			var x = _x + (Math.floor(i%_row) * _cellSize);
			var y = _y + (Math.floor(i/_row) * _cellSize);
			if(_currSigil[i][0] === 1) {
				sb.drawRect(x,y,_cellSize,_cellSize,'#52bbae');
			} else {
				// sb.drawRect(x,y,_cellSize,_cellSize,'#eee');
			}
		}
	};

	var _update = function() {
		_tempY += _speed;
		if(_tempY >= _cellSize){
			_tempY = 0;
			_move('down');
		}
	};

	var _move = function(dir) {
		if(!_currSigil) return;
		switch(dir) {
			case 'right':
				if(_isCellEmpty(_currSigil, _cellSize, 0)) _x += _cellSize;
				break;
			case 'left':
				if(_isCellEmpty(_currSigil, -_cellSize, 0)) _x -= _cellSize;
				break;
			case 'down':
				if(_isCellEmpty(_currSigil, 0, _cellSize)) {
					_y += _cellSize;
				} else {
					sb.publishEvent('sigil-fixed', [_currSigil, _x, _y]);
				}
				break;
		}
	};

	var _rotate = function() {
		var tempSigil = [];
		var i = 0;
		tempSigil.length = _currSigil.length;
		for (i = 0; i < _currSigil.length; i++){
			var x = i % _row;
			var y = Math.floor(i/_row);
			var newX = _row - y - 1;
			var newY = x;
			var newIndex = newY * _row + newX;
			tempSigil[newIndex] = _currSigil[i];
		}

		if(_hasSpaceToBe(tempSigil)) {
			_currSigil = tempSigil;
		}
		// Reposition if out of bounds
	};

	var _levelUp = function() {
		_speed += 2;
	};

	var _hasSpaceToBe = function(sigil){
		var x, y;
		for (i = 0; i < sigil.length; i++){
			if(sigil[i] == 1){

				x = _x + (Math.floor(i%_row) * _cellSize);
				y = _y + (Math.floor(i/_row) * _cellSize);
				
				// If rotating makes it go off the left side of canvas,
				// check if it can be shifted to the right
				// If possible, shift and rotate
				if(x < 0) {
					if(_isCellEmpty(sigil, _cellSize, 0)) {
						_x += x*-1;
						return true;
					} else {
						return false;
					}
				}
				// If rotating makes it go off the right side of canvas,
				// check if it can be shifted to the left
				// If possible, shift and rotate
				if(x >= sb.getGridData().width) {
					if(_isCellEmpty(sigil, -_cellSize, 0)) {
						_x += x - (sb.getGridData().width + _cellSize);
						return true;
					} else {
						return false;
					}
				}
				// If rotating makes it go off the bottom of canvas,
				// shift it higher
				if(y >= sb.getGridData().height) {
					_y += y - (sb.getGridData().height + _cellSize);
					return true;
				}
				// If rotating makes it overlap blocked cells,
				// Check if it can be shifted left or right
				// If so, shift and rotate
				if(sb.checkCell(x, y) === 1) {
					if(x-_x >= 80) {
						if(_isCellEmpty(sigil, -_cellSize, 0)){
							_x -= _cellSize;
							return true;
						} else {
							return false;
						}
					} else {
						if(_isCellEmpty(sigil, +_cellSize, 0)){
							_x += _cellSize;
							return true;
						} else {
							return false;
						}
					}
				}
			}
		}
		return true;
	};

	var _isCellEmpty = function(sigil, xOffset, yOffset){
		for (i = 0; i < sigil.length; i++){
			var x = _x + (Math.floor(i%_row) * _cellSize) + xOffset;
			var y = _y + (Math.floor(i/_row) * _cellSize) + yOffset;
			if(sigil[i] == 1){
				if(x < 0 || x >= sb.getGridData().width) { 
					return false;
				}
				if(y >= sb.getGridData().height) {
					return false;
				}
				if(sb.checkCell(x, y) === 1) {
					return false;
				}
			}
		}
		return true;
	};

	var _reset = function(){
		_x = 3 * _cellSize;
		_y = 0;
		_currSigil = _nextSigil;
		_nextSigil = _types[Math.floor(Math.random()*_types.length)];
		for(var i = 0; i < Math.floor(Math.random()*3); i++) _rotate();
		if(_isCellEmpty(_currSigil, 0, -_cellSize)) _y -= _cellSize;
		if(!_hasSpaceToBe(_currSigil)) {
			console.log("OVER");
			_currSigil = [];
			sb.setGameState("IS_OVER");
			sb.publishEvent('game-over');
		}
	};
	
	var _init = function(){
		_cellSize = sb.getGridData().cellSize;
		sb.subscribeEvent('move-sigil', _move);
		sb.subscribeEvent('rotate-sigil', _rotate);
		sb.subscribeEvent('sigil-settled', _reset);
		sb.subscribeEvent('render', _draw);
		sb.subscribeEvent('update', _update);	
		sb.subscribeEvent('level-up', _levelUp);
		sb.subscribeEvent('game-start', _reset);
	};

	var _destroy = function(){
		
	};

	return {
		init: _init,
		destroy: _destroy
	};
});