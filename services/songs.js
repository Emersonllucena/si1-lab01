app.factory("songs", function() {
	var songList = [];

	return {
		getSongList: function() {
			return songList;
		},

		pushSong: function(newSong) {
			songList.push(newSong);
		}
	}
});