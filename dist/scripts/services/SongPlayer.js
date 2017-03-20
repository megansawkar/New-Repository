(function() {
		function SongPlayer($rootScope, Fixtures) {
				var SongPlayer = {};
				/**
				@desc Retrieves the current album from the Fixtures service
				@type {Object}
				*/
				var currentAlbum = Fixtures.getAlbum();

			  /**
			  * @desc Buzz object audio file
			  * @type {Object}
			  */
     		var currentBuzzObject = null;
					
				/**
				* @function setSong
				* @desc Stops currently playing song and loads new audio file as currentBuzzObject
				* @param {Object} song
				*/
				var setSong = function(song) {
						if (currentBuzzObject) {
								currentBuzzObject.stop();
								SongPlayer.currentSong.playing = null;
						}

						currentBuzzObject = new buzz.sound(song.audioUrl, {
								formats: ['mp3'],
								preload: true
						});
					
						currentBuzzObject.bind('timeupdate', function() {
								$rootScope.$apply(function() {
										SongPlayer.currentTime = currentBuzzObject.getTime();
								});
						});

						SongPlayer.currentSong = song;
				};
				
				/**
				* @function playSong
				* @desc Sets currently playing song to true and sets current Buzz {Object} to play
				* @param {Object} song
				*/
				var playSong = function(song) {
						currentBuzzObject.play();
						song.playing = true;
				};
			
				/**
				* @function stopSong
				* @desc Sets currently playing song to null and sets current Buzz {Object} to stop
				* @param {Object} song
				*/
				var stopSong = function(song) {
						currentBuzzObject.stop();
						song.playing = null;
				};
			
				/**
				* @function getSongIndex
				* @desc Returns the index of the selected song
				* @param {Object} song
				*/
				var getSongIndex = function(song) {
						return currentAlbum.songs.indexOf(song);
				};
				
				/**
				* @desc Currently playing song audio file
				* @type {Object}
				*/
				SongPlayer.currentSong = null;
			
				/**
				*@desc Current playback time (in seconds) of currently playing song
				*@type {Number}
				*/
				SongPlayer.currentTime = null;
			
				/**
				* @function SongPlayer.play
				* @desc Sets the clicked song and plays the clicked song
				* @param {Object} song
				*/
				SongPlayer.play = function(song) {
						song = song || SongPlayer.currentSong;
						if (SongPlayer.currentSong !== song) {
								setSong(song);
								playSong(song);
						} else if (SongPlayer.currentSong === song) {
								if (currentBuzzObject.isPaused()) {
										playSong(song);
								}
						}
				};
			
				/**
				* @function SongPlayer.pause
				* @desc Sets the currently playing song to false and the Buzz object to pause
				* @param {Object} song
				*/
				SongPlayer.pause = function(song) {
						song = song || SongPlayer.currentSong;
						currentBuzzObject.pause();
						song.playing = false;
				};
			
				/**
				* @function SongPlayer.previous
				* @desc Gets the index of the currently playing song and increments back to the previous index and previous song
				* @param 
				*/
				SongPlayer.previous = function() {
						var currentSongIndex = getSongIndex(SongPlayer.currentSong);
						currentSongIndex--;
					
						if (currentSongIndex < 0) {
								stopSong(SongPlayer.currentSong);
						} else {
								var song = currentAlbum.songs[currentSongIndex];
								setSong(song);
								playSong(song);
						}
				};
			
				/**
				* @function SongPlayer.next
				* @desc Gets the index of the currently playing song and increments up to the next index and next song
				* @param
				*/
				SongPlayer.next = function() {
						var currentSongIndex = getSongIndex(SongPlayer.currentSong);
						currentSongIndex++;
					
						if (currentSongIndex === currentAlbum.songs.length) {
								stopSong(SongPlayer.currentSong);
						} else {
								var song = currentAlbum.songs[currentSongIndex];
								setSong(song);
								playSong(song);
						}
				};
			
				/**
				* @function setCurrentTime
				* @desc Set current time (in seconds) of currently playing song
				* @param {Number} time
				*/
				SongPlayer.setCurrentTime = function(time) {
						if (currentBuzzObject) {
								currentBuzzObject.setTime(time);
						}
				};
			
				return SongPlayer;
		}
	
		angular
				.module('blocJams')
				.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();