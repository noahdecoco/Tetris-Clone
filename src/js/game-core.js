var TETRIS = (function(){

	var _debugMode = false;
	var _this = {};
	var _modules = {};
	var _events = {};
	var _canvas, _ctx;
	var _gridData = {};
	var _gameState = "IS_PLAYING";

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

	var _initModule = function(_module) {
		if(typeof _module != 'string' || typeof _modules[_module] == 'undefined') {
			_debug('Failed to start module ' + _module, 'error');
			return false;
		}
		_modules[_module].instance = _modules[_module].construct(TETRIS_SANDBOX.create(_this, _module));
		_modules[_module].instance.init();
	};

	var _initAllModules = function() {
		for(var module in _modules) {
			_initModule(module);
		}
	};

	var _destroyModule = function(_module) {
		if(typeof _module != 'string' || typeof _modules[_module] == 'undefined') {
			_debug('Failed to stop module ' + _module, 'error');
			return false;
		}
		_modules[_module].instance.destroy();
		_modules[_module].instance = null;
	};

	var _destroyAllModules = function() {
		for(var module in _modules) {
			_destroyModule(module);
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
		if(typeof _event != 'string'){
			_debug('Failed to trigger Event ' + _event, 'error');
			return false;
		}
		if(typeof _events[_event] == 'undefined') {
			_debug('Event "' + _event + '" hasn\'t been created yet', 'warn');
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

	// GRID
	var _checkCell = function(x,y){
		if(y <= 0 || typeof _gridData.grid == 'undefined') return 0;
		return _gridData.grid[y/_gridData.cellSize][x/_gridData.cellSize];
	};

	var _getGridData = function(){
		return _gridData;
	};

	var _setGridData = function(key, data){
		_gridData[key] = data;
	};
	

	// RENDERING
	var _createCanvas = function(cvsId, w, h) {
		_canvas = document.createElement('canvas');
		_ctx = _canvas.getContext('2d');
		_canvas.width = w; _canvas.height = h;
		document.getElementById(cvsId).appendChild(_canvas);
	};

	var _clearCanvas = function() {
		_canvas.width = _canvas.width;
	};

	var _drawRect = function(x, y, w, h, c) {
		_ctx.rect(x, y, w, h);
		_ctx.fillStyle = c;
		_ctx.fillRect(x, y, w, h);
		_ctx.strokeStyle = "#fff";
		_ctx.stroke();
	};
	
	var _getGameState = function(){
		return _gameState;
	};

	var _setGameState = function(state){
		_gameState = state;
	};

	// Initialise
	var _initGame = function(cvsId, w, h, c){
		_createCanvas(cvsId, w, h);
		_gridData = {
			width    : w,
			height   : h,
			cellSize : c,
			rows     : _canvas.height/c,
			cols     : _canvas.width/c
		};
	};

	var _startGame = function(){
		_publishEvent("game-start");
	};

	var _replayGame = function(){
		_publishEvent("game-start");
	};

	var _gameOver = function(){
		_publishEvent("game-over");
	};


	_this = {
		// Modules
		registerModule      : _registerModule,
		initModule          : _initModule,
		initAllModules      : _initAllModules,
		destroyModule       : _destroyModule,
		destroyAllModules   : _destroyAllModules,
		// Events
		subscribeEvent      : _subscribeEvent,
		publishEvent        : _publishEvent,
		addEventListener    : _addEventListener,
		removeEventListener : _removeEventListener,
		// RENDERING
		createCanvas        : _createCanvas,
		clearCanvas         : _clearCanvas,
		drawRect            : _drawRect,
		// GRID
		checkCell           : _checkCell,
		getGridData         : _getGridData,
		setGridData         : _setGridData,
		// INITITIALISE
		getGameState        : _getGameState,
		setGameState        : _setGameState,
		initGame            : _initGame,
		startGame           : _startGame,
		replayGame          : _replayGame
	};

	return _this;

})();