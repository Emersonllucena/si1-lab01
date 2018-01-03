app.factory("playlists", function(loggedUser, $http) {
	var playlists = [];
	var playlistDisplay = null;

	return {
		getPlaylists: function() {
			return playlists;
		},

		pushPlaylist: function(newPlaylist) {
			playlists.push(newPlaylist);
		},

		updatePlaylists: function() {
			loggedUser.update().then(loggedUser.updatePlaylists).then(function() {
				var temp = loggedUser.getPlaylists();
				var tl = [];
				for(var j = 0; j < temp.data.length; j++) {
					var pn = (temp.data)[j].name;
					var sn = (temp.data)[j].song;
					var found = false;

					for(var i = 0; i < tl.length; i++)
						if(tl[i].name == pn)
							found = true;

					if(!found)
						tl.push(new Playlist(pn));

					for(var i = 0; i < tl.length; i++)
						if(tl[i].name == pn)
							tl[i].songs.push(sn);
				}
				playlists = tl;
			});
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
			$http.get("/playlistRemove/" + songName).then(function suc(res) {
				console.log("Removido com sucesso");
				console.log(res);

			}, function err(res) {
				console.log("Erro no /playlistRemove");
				console.log(res);
			});

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