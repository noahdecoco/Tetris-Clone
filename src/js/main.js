// GAME STATES
// -> game-init
// --- create canvas
// --- create grid
// --- start the game-render event
// --- initialise all modules

// -> game-reset
// --- play grid intro animation
// --- set sigil to blank
// --- set score to 0
// --- set level to 0
// --- add key listeners

// -> game-start
// --- create first sigil
// --- start the game-update event
// ---- check for key presses
// ---- check for cleared rows
// ---- update score, level

// -> game-pause
// --- stop the game-update event
// --- stop the game-render event
// --- remove key listeners

// -> game-play
// --- start the game-update event
// --- start the game-render event
// --- add key listeners

// -> game-over
// --- play grid outro animation
// --- stop the game-update event
// --- remove key listeners


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

TETRIS.initGame('game-canvas', 300, 600, 30);
TETRIS.initAllModules();



