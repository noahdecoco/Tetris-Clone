GAME_CORE.registerModule('grid', function(sb){

	var _gridData;
	var _grid = [];

	var _drawGrid = function(){
		var r,c;
		for(r = 0; r < _gridData.rows; r++){
			for(c = 0; c < _gridData.cols; c++){
				if(_grid[r][c] === 1) {
					sb.drawRect(c*_gridData.cellSize, r*_gridData.cellSize, _gridData.cellSize, _gridData.cellSize, "#333");
				} else {
					sb.drawRect(c*_gridData.cellSize, r*_gridData.cellSize, _gridData.cellSize, _gridData.cellSize, "#ddd");
				}
			}
		}
	};

	var _blockCells = function(sigil,x,y){
		for(var i = 0; i < sigil.length; i++) {
			if(sigil[i] == 1){
				var posX = x + (i%4)*_gridData.cellSize;
				var posY = y + Math.floor(i/4)*_gridData.cellSize;
				_grid[posY/_gridData.cellSize][posX/_gridData.cellSize] = 1;
			}
		}
		sb.publishEvent('reset-sigil');
	};

	var _init = function(){
		_gridData = sb.getGridData();
		var r, c, tempRow;
		for(r = 0; r < _gridData.rows; r++){
			tempRow = [];
			for(c = 0; c < _gridData.cols; c++){
				tempRow.push(0);
			}
			_grid.push(tempRow);
		}
		sb.subscribeEvent('render', _drawGrid);
		sb.subscribeEvent('sigil-fixed', _blockCells);
	};

	var _destroy = function(){
		
	};

	return {
		init: _init,
		destroy: _destroy
	};
});