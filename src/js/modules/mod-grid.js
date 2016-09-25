TETRIS.registerModule('grid', function(sb){

	var _grid = [];

	var _drawGrid = function(){
		var r,c;
		for(r = 0; r < sb.getGridData().rows; r++){
			for(c = 0; c < sb.getGridData().cols; c++){
				if(sb.getGridData().grid[r][c] === 1) {
					sb.drawRect(c*sb.getGridData().cellSize, r*sb.getGridData().cellSize, sb.getGridData().cellSize, sb.getGridData().cellSize, "#333");
				} else {
					sb.drawRect(c*sb.getGridData().cellSize, r*sb.getGridData().cellSize, sb.getGridData().cellSize, sb.getGridData().cellSize, "#ddd");
				}
			}
		}
	};

	var _blockCells = function(sigil,x,y){
		for(var i = 0; i < sigil.length; i++) {
			var posX = x + (i%4)*sb.getGridData().cellSize;
			var posY = y + Math.floor(i/4)*sb.getGridData().cellSize;
			if(posY >= 0) {
				switch(sigil[i][0]){
					case 1:
						_grid[posY/sb.getGridData().cellSize][posX/sb.getGridData().cellSize] = 1;
						break;
					case 2:
						if (typeof _grid[posY/sb.getGridData().cellSize] != 'undefined' && typeof _grid[posY/sb.getGridData().cellSize][posX/sb.getGridData().cellSize] != 'undefined'){
							_grid[posY/sb.getGridData().cellSize][posX/sb.getGridData().cellSize] = 0;
						}
						break;
				}
			}
		}
		sb.setGridData("grid", _grid);
		_checkRows();
	};

	var _checkRows = function(){
		var rowFull = true, numRows = 0, r, c;
		for(r = 0; r < sb.getGridData().rows; r++){
			// console.log(sb.getGridData().grid[r]);
			rowFull = true;
			for(c = 0; c < sb.getGridData().cols; c++) {
				if(sb.getGridData().grid[r][c] === 0) {
					// console.log("not full");
					rowFull = false;
					break;
				}
			}
			if(rowFull) {
				numRows++;
				sb.getGridData().grid.splice(r,1);
				var tempRow = [];
				for(c = 0; c < sb.getGridData().cols; c++) {
					tempRow.push(0);
				}
				sb.getGridData().grid.unshift(tempRow);
			}
		}
		if(numRows !== 0) sb.publishEvent('row-cleared', [numRows]);
	};

	var _updateCell = function(r,c,val){
		// sb.getGridData().grid[r][c] = val;
		_grid[r][c] = val;
		sb.setGridData('grid', _grid);
	};

	var _onGameStateChange =  function(state){
		var r, c;
		switch(state) {
			case 'game-reset':
				for(r = 0; r < sb.getGridData().rows; r++){
					for(c = 0; c < sb.getGridData().cols; c++){
						setTimeout(_updateCell.bind(null,r,c,0), (r*10+c)*10);
					}
				}
				break;
			case 'game-stop':
				for(r = 0; r < sb.getGridData().rows; r++){
					for(c = 0; c < sb.getGridData().cols; c++){
						setTimeout(_updateCell.bind(null,r,c,1), (r*10+c)*10);
					}
				}
				break;
		}
	};

	var _init = function(){
		var r, c, row;
		for(r = 0; r < sb.getGridData().rows; r++){
			row = [];
			for(c = 0; c < sb.getGridData().cols; c++){
				row.push(1);
			}
			_grid.push(row);
		}
		sb.setGridData('grid', _grid);
		sb.subscribeEvent('game-render', _drawGrid);
		sb.subscribeEvent('sigil-fixed', _blockCells);
		sb.subscribeEvent('game-stateChange', _onGameStateChange);
	};

	var _destroy = function(){
		
	};

	return {
		init: _init,
		destroy: _destroy
	};
});