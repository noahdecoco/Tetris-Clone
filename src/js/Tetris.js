const EventBus = require('./utils/event-bus');
const Canvas = require('./modules/canvas');
const GameLoop = require('./modules/game-loop');

class Tetris {
  constructor(width, height, cell) {
    const eventBus = new EventBus();
    this.canvas = new Canvas(width, height, cell, eventBus);
    this.gameLoop = new GameLoop(eventBus);
  }

  initialise() {
    this.canvas.create();
    this.gameLoop.start();
  }
}

module.exports = Tetris;
