TETRIS.initGame('game-canvas', 300, 600, 30);

TETRIS.initModule('game-loop');
TETRIS.initModule('grid');
TETRIS.initModule('sigil');
TETRIS.initModule('game-controller');
TETRIS.initModule('game-keeper');

// EVENTS
// --> key-pressed : direction/rotation
// --- move sigil
// --- rotate sigil

// --> sigil-fixed : type,position
// --- update grid / block cells
// --- respawn sigil at top
// --- check all rows

// --> grid-rowCleared
// --- update grid / clear cells
// --- update score and level

// --> game-update
// --- check for empty cells
// --- move/rotate sigil

// --> game-render
// --- draw the grid
// --- draw the sigil

// --> game-stateChange