(function() {
		function SongPlayer() {
				var SongPlayer = {};
				/**
				* @desc Currently playing song audio file
				* @type {Object}
				*/
				var currentSong = null;
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
								currentSong.playing = null;
						}

						currentBuzzObject = new buzz.sound(song.audioUrl, {
								formats: ['mp3'],
								preload: true
						});

						currentSong = song;
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
				* @function SongPlayer.play
				* @desc Sets the clicked song and plays the clicked song
				* @param {Object} song
				*/
				SongPlayer.play = function(song) {
						if (currentSong !== song) {
								setSong(song);
								playSong(song);
						} else if (currentSong === song) {
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
				currentBuzzObject.pause();
				song.playing = false;
				};
			
				return SongPlayer;
		}
	
		angular
				.module('blocJams')
				.factory('SongPlayer', SongPlayer);
})();