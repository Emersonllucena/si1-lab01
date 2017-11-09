app.factory("albums", function() {
	var albumList = [];

	return {
		getAlbumList: function() {
			return albumList;
		},

		pushAlbum: function(newAlbum) {
			albumList.push(newAlbum);
		}
	}
});