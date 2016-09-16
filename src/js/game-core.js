var GAME_CORE = (function(){

	var _modules = {};
	var _events = {};

	var _debug = function(msg, weight) {
		console.log(msg);
	};

	var _registerModule = function(_module, _constructor) {
		if(typeof _module != 'string' || typeof _constructor != 'function') {
			_debug("Invalid parameters : Failed to create Module " + _module);
			return false;
		}
		_modules[_module] = {
			construct : _constructor,
			instance : null
		};
	};

	var _startModule = function(_module) {
		if(typeof _module != 'string' || typeof _modules[_module] == 'undefined') {
			_debug("Failed to start module " + _module);
			return false;
		}
		_modules[_module].instance = _modules[_module].construct();
		_modules[_module].instance.init();
	};

	var _startAllModules = function() {
		for(var module in _modules) {
			_startModule(module);
		}
	};

	var _stopModule = function(_module) {
		if(typeof _module != 'string' || typeof _modules[_module] == 'undefined') {
			_debug("Failed to stop module " + _module);
			return false;
		}
		_modules[_module].instance.destroy();
		_modules[_module].instance = null;
	};

	var _stopAllModules = function() {
		for(var module in _modules) {
			_stopModule(module);
		}
	};

	return {
		registerModule  : _registerModule,
		startModule     : _startModule,
		startAllModules : _startAllModules,
		stopModule      : _stopModule,
		stopAllModules  : _stopAllModules
	};

})();