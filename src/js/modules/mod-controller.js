TETRIS.registerModule('game-controller', function(sb){

	var btnPlay, btnRewind, btnStop;
	var isPlaying = false;
	var isPaused = false;

	var _changeGameState = function(state){
		switch(state) {
			case "RESET":
				break;
			case "PLAY":
				break;
			case "PAUSE":
				break;
			case "REWIND":
				break;
			case "STOP":
				break;
		}
	};

	var _playGame =function(e){
		if(!isPlaying){
			sb.publishEvent('game-stateChange', ['game-reset']);
			setTimeout(function(){
				sb.publishEvent('game-stateChange', ['game-play']);
			}, 2500);
			// isPlaying = true;
		} else {
			if(isPaused) {
				sb.publishEvent('game-stateChange', ['game-play']);
			} else {
				sb.publishEvent('game-stateChange', ['game-pause']);
			}
			// isPaused = !isPaused;
		}
	};

	var _rewindGame =function(e){
		if(isPlaying){
			sb.publishEvent('game-stateChange', ['game-rewind']);
			sb.addEventListener(btnRewind, 'mouseup', _playGame);
			isPaused = !isPaused;
		}
	};

	var _stopGame =function(e){
		if(isPlaying){
			sb.publishEvent('game-stateChange', ['game-stop']);
		}
	};

	var _onGameStateChange =  function(state){
		console.log("State : " + state);
		switch(state) {
			case 'game-reset':
				isPlaying = false;
				isPaused = false;
				btnPlay.innerHTML = "START";
				break;
			case 'game-play':
				isPlaying = true;
				isPaused = false;
				btnPlay.innerHTML = "PAUSE";
				break;
			case 'game-pause':
				isPaused = true;
				btnPlay.innerHTML = "PLAY";
				break;
			case 'game-stop':
				isPlaying = false;
				isPaused = false;
				btnPlay.innerHTML = "START";
				break;
		}
	};

	var _init = function(){
		btnPlay = document.getElementById('btn-play');
		sb.addEventListener(btnPlay, 'click', _playGame);

		btnRewind = document.getElementById('btn-rewind');
		sb.addEventListener(btnRewind, 'mousedown', _rewindGame);
		sb.addEventListener(btnRewind, 'mouseup', _playGame);

		btnStop = document.getElementById('btn-stop');
		sb.addEventListener(btnStop, 'click', _stopGame);

		sb.subscribeEvent('game-stateChange', _onGameStateChange);
	};

	var _destroy = function(){

	};

	return {
		init: _init,
		destroy: _destroy
	};
});