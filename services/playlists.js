app.factory("playlists", function() {
	var playlists = [];
	var playlistDisplay = null;

	return {
		getPlaylists: function() {
			return playlists;
		},

		pushPlaylist: function(newPlaylist) {
			playlists.push(newPlaylist);
		},

		getDisplay: function() {
			return playlistDisplay;
		},

		addToDisplay: function(name) {
			for(var i = 0; i < playlists.length; i++) {
				if(playlists[i].name == name) playlistDisplay = playlists[i];
			}
		},

		addSong: function(playlistName, songName) {
			for(var i = 0; i < playlists.length; i++) {
				if(playlists[i].name == playlistName) playlists[i].songs.push(songName);
			}
		},

		removeSong: function(playlistName, songName) {
			for(var i = 0; i < playlists.length; i++) {
				if(playlists[i].name == playlistName) {
					for(var j = 0; j < playlists[i].songs.length; j++) {
						if(playlists[i].songs[j] == songName) {
							playlists[i].songs.splice(j, 1);
						}
					}
				}
			}
		}
	}
});