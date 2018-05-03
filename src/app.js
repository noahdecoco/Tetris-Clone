const styles = require('./css/index.scss');

const Tetris = require('./js/Tetris');

const tetris = new Tetris(400, 600, 20);
tetris.initialise();
