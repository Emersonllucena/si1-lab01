app.factory("albums", function() {
	var albumList = [];

	return {
		getAlbumList: function() {
			return albumList;
		},

		pushAlbum: function(newAlbum) {
			albumList.push(newAlbum);
		},

		albumsWithArtist: function(name) {
			var ret = [];
			for(var i = 0; i < albumList.length; i++) {
				if(albumList[i].artist == name) ret.push(albumList[i]);
			}
			return ret;
		 }
	}
});