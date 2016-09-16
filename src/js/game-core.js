var GAME_CORE = (function(){

	var _debugMode = false;
	var _this = {};
	var _modules = {};
	var _events = {};

	var _debug = function(msg, weight) {
		if(_debugMode) console.log(msg);
	};

	// MODULES
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
		_modules[_module].instance = _modules[_module].construct(GAME_SANDBOX.create(_this, _module));
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

	// EVENTS
	var _registerEvent = function(_event, _callback) {
		if(typeof _event != 'string' || typeof _callback != 'function') {
			_debug("Invalid parameters : Failed to create Event " + _event);
			return false;
		}
		if(typeof _events[_event] == 'undefined') _events[_event] = [];
		_events[_event].push(_callback);
	};

	var _triggerEvent = function(_event) {
		if(typeof _event != 'string' || typeof _events[_event] == 'undefined') {
			_debug("Failed to trigger Event " + _event);
			return false;
		}
		for (var i = 0; i < _events[_event].length; i++){
			_events[_event][i].call();
		}
	};

	_this = {
		// Modules
		registerModule  : _registerModule,
		startModule     : _startModule,
		startAllModules : _startAllModules,
		stopModule      : _stopModule,
		stopAllModules  : _stopAllModules,
		// Events
		registerEvent   : _registerEvent,
		triggerEvent    : _triggerEvent
	};

	return _this;

})();