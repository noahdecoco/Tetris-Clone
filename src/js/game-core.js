var GAME_CORE = (function(){

	var _debugMode = true;
	var _this = {};
	var _modules = {};
	var _events = {};

	var _debug = function(msg, type) {
		var _type = type || 'log';
		if(_debugMode) console[_type](msg);
	};

	// MODULES
	var _registerModule = function(_module, _constructor) {
		if(typeof _module != 'string' || typeof _constructor != 'function') {
			_debug('Invalid parameters : Failed to create Module ' + _module, 'error');
			return false;
		}
		_modules[_module] = {
			construct : _constructor,
			instance : null
		};
	};

	var _startModule = function(_module) {
		if(typeof _module != 'string' || typeof _modules[_module] == 'undefined') {
			_debug('Failed to start module ' + _module, 'error');
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
			_debug('Failed to stop module ' + _module, 'error');
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
	var _subscribeEvent = function(_event, _callback) {
		if(typeof _event != 'string' || typeof _callback != 'function') {
			_debug('Invalid parameters : Failed to create Event ' + _event, 'error');
			return false;
		}
		if(typeof _events[_event] == 'undefined') _events[_event] = [];
		_events[_event].push(_callback);
	};

	var _publishEvent = function(_event, _data) {
		if(typeof _event != 'string' || typeof _events[_event] == 'undefined') {
			_debug('Failed to trigger Event ' + _event, 'error');
			return false;
		}
		for (var i = 0; i < _events[_event].length; i++){
			_events[_event][i].apply({}, _data);
		}
	};

	var _addEventListener = function(dom, type, event) {
		dom.addEventListener(type, event);
	};

	var _removeEventListener = function(dom, type, event) {
		dom.removeEventListener(type, event);
	};

	_this = {
		// Modules
		registerModule      : _registerModule,
		startModule         : _startModule,
		startAllModules     : _startAllModules,
		stopModule          : _stopModule,
		stopAllModules      : _stopAllModules,
		// Events
		subscribeEvent       : _subscribeEvent,
		publishEvent        : _publishEvent,
		addEventListener    : _addEventListener,
		removeEventListener : _removeEventListener
	};

	return _this;

})();