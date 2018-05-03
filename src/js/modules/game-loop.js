const FPS = 1000 / 15;
const UPS = 1000 / 30;

class GameLoop {
  constructor(eventBus) {
    const time = new Date().getTime();
    this.lastRenderTime = time;
    this.lastUpdateTime = time;

    this.isPaused = false;
    this.eventBus = eventBus;

    this.loop = this.loop.bind(this);

    this.setupListeners();
  }

  setupListeners() {
    this.eventBus.subscribeEvent('game-stateChange', this.onGameStateChange);
  }

  start() {
    if (!this.animID) {
      window.requestAnimationFrame(this.loop);
    }
  }

  stop() {
    if (this.animID) {
      window.cancelAnimationFrame(this.animID);
    }
  }

  loop() {
    this.currentTime = new Date().getTime();
    this.update();
    this.render();
    this.animID = window.requestAnimationFrame(this.loop);
  }

  update() {
    const deltaTime = this.currentTime - this.lastUpdateTime;
    if (this.isPlaying && deltaTime > UPS) {
      this.eventBus.publishEvent('game-update');
      this.lastUpdateTime = this.currentTime;
    }
  }

  render() {
    const deltaTime = this.currentTime - this.lastRenderTime;
    if (deltaTime > FPS) {
      this.eventBus.publishEvent('game-render');
      this.lastRenderTime = this.currentTime;
    }
  }

  onGameStateChange({ state }) {
    switch (state) {
      case 'game-play':
      case 'game-resume':
        this.isPlaying = true;
        break;
      case 'game-pause':
        this.isPlaying = false;
        break;
    }
  }
}

module.exports = GameLoop;
