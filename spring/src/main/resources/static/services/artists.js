app.factory("artists", function(loggedUser) {
	var artistList = [];
	var artistDisplay = null;

	return {
		getArtistList: function() {
			return artistList;
		},

		updateArtistList: function() {
			loggedUser.update().then(loggedUser.updateArtists).then(function() {
				var temp = loggedUser.getArtists();
				var tl = [];
				for(var i = 0; i < temp.data.length; i++) {
					tl.push(new Artist((temp.data)[i].name, (temp.data)[i].info, (temp.data)[i].url));
				}
				artistList = tl;
			});
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
				if(artistList[i].name == name)  {
					if(artistList[i].fav == true && confirm("Tem certeza que deseja remover o artista dos favoritos?")) artistList[i].fav = !artistList[i].fav;
					else artistList[i].fav = !artistList[i].fav
				}
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