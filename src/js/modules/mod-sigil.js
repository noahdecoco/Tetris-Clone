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

	var _currSigil = _types[0];

	var _draw = function() {

	};

	var _update = function() {

	};

	var _move = function(dir) {
		console.log("sigil moving " + dir);
	};

	var _rotate = function() {
		console.log("sigil rotating");
	};
	
	var _init = function(){
		sb.subscribeEvent("move-sigil", _move);
		sb.subscribeEvent("rotate-sigil", _rotate);
	};

	var _destroy = function(){
		
	};

	return {
		init: _init,
		destroy: _destroy
	};
});