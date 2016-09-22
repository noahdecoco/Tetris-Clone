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
				sb.getGridData().grid[posY/sb.getGridData().cellSize][posX/sb.getGridData().cellSize] = 1;
			}
		}
		sb.setGridData("grid", sb.getGridData().grid);
		sb.publishEvent('sigil-settled');
	};

	var _init = function(){

		var grid = [], r, c, row;
		for(r = 0; r < sb.getGridData().rows; r++){
			row = [];
			for(c = 0; c < sb.getGridData().cols; c++){
				row.push(0);
			}
			grid.push(row);
		}
		sb.setGridData("grid", grid);
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