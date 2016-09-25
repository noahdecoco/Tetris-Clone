TETRIS.registerModule('game-controller', function(sb){

	var btnPlay, btnRewind, btnStop;
	var isPlaying = false;
	var isPaused = false;

	var _playGame =function(e){
		if(!isPlaying){
			sb.publishEvent('game-stateChange', ['game-reset']);
			sb.publishEvent('game-stateChange', ['game-play']);
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
		}
	};

	var _rewindGame =function(e){
		if(isPlaying){
			sb.publishEvent('game-stateChange', ['game-rewind']);
		}
	};

	var _stopGame =function(e){
		if(isPlaying){
			isPlaying = false;
			isPaused = false;
			sb.publishEvent('game-stateChange', ['game-stop']);
			btnPlay.innerHTML = "START";
		}
	};

	var _init = function(){
		btnPlay = document.getElementById('btn-play');
		sb.addEventListener(btnPlay, 'click', _playGame);

		btnRewind = document.getElementById('btn-rewind');
		sb.addEventListener(btnRewind, 'keydown', _rewindGame);
		sb.addEventListener(btnRewind, 'keydown', _rewindGame);

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