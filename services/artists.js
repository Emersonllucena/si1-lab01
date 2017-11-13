app.factory("artists", function() {
	var artistList = [];
	var artistDisplay = null;

	return {
		getArtistList: function() {
			return artistList;
		},

		pushArtist: function(newArtist) {
			artistList.push(newArtist);
		},

		getDisplay: function() {
			return artistDisplay;
		},

		addToDisplay: function(name) {
			for(var i = 0; i < artistList.length; i++) {
				if(artistList[i].name == name) artistDisplay = artistList[i];
			}
		},

		toggleFav: function(name) {
			for(var i = 0; i < artistList.length; i++) {
				if(artistList[i].name == name) artistList[i].fav = !artistList[i].fav;
			}
		}, 
		
		isFav: function(name) {
			for(var i = 0; i < artistList.length; i++) {
				if(artistList[i].name == name) return artistList[i].fav;
			}
		},

		getLastSong: function(name) {
			for(var i = 0; i < artistList.length; i++) {
				if(artistList[i].name == name) return artistList[i].lastSong;
			}
		},

		setLastSong: function(name, lastSong) {
			for(var i = 0; i < artistList.length; i++) {
				if(artistList[i].name == name) artistList[i].lastSong = lastSong;
			}
		},

		getRating: function(name) {
			for(var i = 0; i < artistList.length; i++) {
				if(artistList[i].name == name) return artistList[i].rating;
			}
		},

		setRating: function(name, rating) {
			for(var i = 0; i < artistList.length; i++) {
				if(artistList[i].name == name) artistList[i].rating = rating;
			}
		}
	}
});