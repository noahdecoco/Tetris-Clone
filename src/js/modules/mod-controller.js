TETRIS.registerModule('game-controller', function(sb){

	var btnPlay, btnRewind, btnStop;
	var isStarted = false;
	var isPlaying = false;
	var isPaused = false;
	var isRewind = false;

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
			isPlaying = true;
			btnPlay.innerHTML = "PAUSE";
		} else {
			if(isPaused) {
				sb.publishEvent('game-stateChange', ['game-play']);
				btnPlay.innerHTML = "PAUSE";
			} else {
				sb.publishEvent('game-stateChange', ['game-pause']);
				btnPlay.innerHTML = "PLAY";
			}
			isPaused = !isPaused;
			isRewind = false;
		}
		isStarted = true;
	};

	var _rewindGame =function(e){
		if(isPlaying){
			sb.publishEvent('game-stateChange', ['game-rewind']);
			sb.addEventListener(btnRewind, 'mouseup', _playGame);
			isPaused = !isPaused;
			isRewind = true;
		}
	};

	var _stopGame =function(e){
		if(isPlaying){
			isPlaying = false;
			isPaused = false;
			sb.publishEvent('game-stateChange', ['game-stop']);
			btnPlay.innerHTML = "START";
		}
		isStarted = false;
	};

	var _init = function(){
		btnPlay = document.getElementById('btn-play');
		sb.addEventListener(btnPlay, 'click', _playGame);

		btnRewind = document.getElementById('btn-rewind');
		sb.addEventListener(btnRewind, 'mousedown', _rewindGame);
		sb.addEventListener(btnRewind, 'mouseup', _playGame);

		btnStop = document.getElementById('btn-stop');
		sb.addEventListener(btnStop, 'click', _stopGame);
	};

	var _destroy = function(){

	};

	return {
		init: _init,
		destroy: _destroy
	};
});