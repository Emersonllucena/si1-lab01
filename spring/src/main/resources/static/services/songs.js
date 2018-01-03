app.factory("songs", function(loggedUser) {
	var songList = [];

	return {
		getSongList: function() {
			return songList;
		},

		updateSongList: function() {
			loggedUser.update().then(loggedUser.updateSongs).then(function() {
				var temp = loggedUser.getSongs();
				var tl = [];
				for(var i = 0; i < temp.data.length; i++) {
					tl.push(new Song((temp.data)[i].name, (temp.data)[i].artist, (temp.data)[i].album, (temp.data)[i].year, (temp.data)[i].duration));
				}
				songList = tl;
			});
		},

		pushSong: function(newSong) {
			songList.push(newSong);
		}
	}
});