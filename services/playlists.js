app.factory("playlists", function() {
	var playlists = [];

	return {
		getPlaylists: function() {
			return playlists;
		},

		pushPlaylist: function(newPlaylist) {
			playlists.push(newPlaylist);
		}
	}
});