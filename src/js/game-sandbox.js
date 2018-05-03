var TETRIS_SANDBOX = (function() {
  var _core, _module;

  var _subscribeEvent = function(event, callback) {
    _core.subscribeEvent(event, callback);
  };

  var _publishEvent = function(event, data) {
    _core.publishEvent(event, data);
  };

  var _addEventListener = function(dom, type, event) {
    _core.addEventListener(dom, type, event);
  };

  var _removeEventListener = function(dom, type, event) {
    _core.removeEventListener(dom, type, event);
  };

  var _clearCanvas = function() {
    _core.clearCanvas();
  };

  var _drawRect = function(x, y, w, h, c) {
    _core.drawRect(x, y, w, h, c);
  };

  var _checkCell = function(x, y) {
    return _core.checkCell(x, y);
  };

  var _checkRows = function() {
    return _core.checkRows();
  };

  var _setGridData = function(key, data) {
    return _core.setGridData(key, data);
  };

  var _getGridData = function() {
    return _core.getGridData();
  };

  var _setGameState = function(state) {
    return _core.setGameState(state);
  };

  var _getGameState = function() {
    return _core.getGameState();
  };

  var _create = function(core, module) {
    _core = core;
    _module = module;

    return {
      subscribeEvent: _subscribeEvent,
      publishEvent: _publishEvent,
      addEventListener: _addEventListener,
      removeEventListener: _removeEventListener,
      clearCanvas: _clearCanvas,
      drawRect: _drawRect,
      checkCell: _checkCell,
      checkRows: _checkRows,
      setGridData: _setGridData,
      getGridData: _getGridData,
      getGameState: _getGameState,
      setGameState: _setGameState,
    };
  };

  return {
    create: _create,
  };
})();
