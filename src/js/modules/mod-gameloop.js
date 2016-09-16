GAME_CORE.registerModule("game-loop", function(){

	var _init = function(){
		console.log("Inited");
	};

	var _destroy = function(){
		console.log("Destroyed");
	};

	return {
		init: _init,
		destroy: _destroy
	};
});