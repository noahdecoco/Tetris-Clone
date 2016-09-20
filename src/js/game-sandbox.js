var GAME_SANDBOX = (function(){

	var _core, _module;

	var _subscribeEvent = function(event, callback){
		_core.subscribeEvent(event, callback);
	};

	var _publishEvent = function(event, data){
		_core.publishEvent(event, data);
	};

	var _addEventListener = function(dom, type, event) {
		_core.addEventListener(dom, type, event);
	};

	var _removeEventListener = function(dom, type, event) {
		_core.removeEventListener(dom, type, event);
	};

	var _clearCanvas = function(){
		_core.clearCanvas();
	};

	var _drawRect = function(x, y, w, h, c) {
		_core.drawRect(x, y, w, h, c);
	};

	var _getGridData = function(){
		return _core.getGridData();
	};

	var _create = function(core, module){

		_core = core; _module = module;

		return {
			subscribeEvent      : _subscribeEvent,
			publishEvent        : _publishEvent,
			addEventListener    : _addEventListener,
			removeEventListener : _removeEventListener,
			clearCanvas         : _clearCanvas,
			drawRect            : _drawRect,
			getGridData         : _getGridData
		};
	};

	return {
		create : _create
	};

})();