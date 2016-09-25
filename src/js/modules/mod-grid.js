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
		sb.publishEvent('sigil-settled');
	};

	var _updateCell = function(r,c,val){
		sb.getGridData().grid[r][c] = val;
		if(r === sb.getGridData().rows-1 && c === sb.getGridData().cols-1) {
			if(val === 0) {
				console.log("start");
				sb.publishEvent("game-start");
			} else if (val === 1) {
				console.log("over");
				// sb.setGameState("IS_STOPPED");
			}
		}
	};
	
	var _onStart = function(){
		var r, c;
		for(r = 0; r < sb.getGridData().rows; r++){
			for(c = 0; c < sb.getGridData().cols; c++){
				setTimeout(_updateCell.bind(null,r,c,0), (r*10+c)*10);
			}
		}
	};

	var _onOver = function(){
		var r, c;
		for(r = 0; r < sb.getGridData().rows; r++){
			for(c = 0; c < sb.getGridData().cols; c++){
				setTimeout(_updateCell.bind(null,r,c,1), (r*10+c)*10);
			}
		}
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
		sb.setGridData('grid', grid);
		sb.subscribeEvent('game-render', _drawGrid);
		sb.subscribeEvent('sigil-fixed', _blockCells);
		sb.subscribeEvent('game-intro', _onStart);
		sb.subscribeEvent('game-over', _onOver);
	};

	var _destroy = function(){
		
	};

	return {
		init: _init,
		destroy: _destroy
	};
});