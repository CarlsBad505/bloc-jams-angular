(function() {
	function SongPlayer(Fixtures) {
		var SongPlayer = {};
		
		/**
		 * @desc Fixtures method to get album.
		 * @type {Object}
		 */
		var currentAlbum = Fixtures.getAlbum();
		
		/**
		 * @function getSongIndex
		 * @desc Grab index of the song
		 * @param {Object} song
		 */
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);	
		};
		
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

			SongPlayer.currentSong = song;
		};
		
		/**
		 * @function playSong
		 * @desc Plays new audio files as currentBuzzObject and sets song.playing property to true
		 * @param {Object} song
		 */
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		};
		
		var stopSong = function(song) {
			currentBuzzObject.stop();
			song.playing = null;
		};
		
		SongPlayer.currentSong = null;
		
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentsong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					currentBuzzObject.play();
				}
			}
		};
		
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		};
		
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				var song = SongPlayer.currentSong;
				stopSong(song);
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			
			if (currentSongIndex >= currentAlbum.songs.length) {
				currentSongIndex = 0;
				var song = currentAlbum.songs[currentSongIndex];
			} else {
				var song = currentAlbum.songs[currentSongIndex];
			}
			setSong(song);
			playSong(song);
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['Fixtures', SongPlayer])
})();