app.factory("artists", function() {
	var artistList = [];

	return {
		getArtistList: function() {
			return artistList;
		},

		pushArtist: function(newArtist) {
			artistList.push(newArtist);
		}
	}
});