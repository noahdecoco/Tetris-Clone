class Canvas {
  constructor(width, height, cell, eventBus) {
    this.width = width;
    this.height = height;
    this.cell = cell;
    this.eventBus = eventBus;

    this.setupListeners();
  }

  setupListeners() {
    this.eventBus.subscribeEvent('game-render', this.onGameRender);
  }

  create() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.body.appendChild(this.canvas);
  }

  onGameRender() {
    // console.log('render');
  }
}

module.exports = Canvas;
