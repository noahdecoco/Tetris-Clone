var GAME_SANDBOX = (function(){

	var _core, _module;

	var _update = function(){
		_core.triggerEvent("update");
	};

	var _render = function(){
		_core.triggerEvent("render");
	};

	var _create = function(core, module){

		_core = core; _module = module;

		return {
			update : _update,
			render : _render
		};
	};

	return {
		create : _create
	};

})();