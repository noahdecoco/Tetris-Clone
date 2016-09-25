TETRIS.registerModule('grid', function(sb){

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
			if(sigil[i] == 1){
				var posX = x + (i%4)*sb.getGridData().cellSize;
				var posY = y + Math.floor(i/4)*sb.getGridData().cellSize;
				if(posY >= 0) sb.getGridData().grid[posY/sb.getGridData().cellSize][posX/sb.getGridData().cellSize] = 1;
			}
		}
		sb.setGridData("grid", sb.getGridData().grid);
		_checkRows();
	};

	var _checkRows = function(){
		console.log("checking rows");
		var rowFull = true, r, c;
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
				sb.getGridData().grid.splice(r,1);
				var tempRow = [];
				for(c = 0; c < sb.getGridData().cols; c++) {
					tempRow.push(0);
				}
				sb.getGridData().grid.unshift(tempRow);
				sb.publishEvent('row-cleared');
			}
		}
	};

	var _updateCell = function(r,c,val){
		sb.getGridData().grid[r][c] = val;
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

		var grid = [], r, c, row;
		for(r = 0; r < sb.getGridData().rows; r++){
			row = [];
			for(c = 0; c < sb.getGridData().cols; c++){
				row.push(1);
			}
			grid.push(row);
		}
		sb.setGridData('grid', grid);
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