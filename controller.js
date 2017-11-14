app.controller('artistController', function($scope, artists) { 
	$scope.title = 'Artistas'; 
	$scope.message = '';
	$scope.fav = false;

	$scope.artist = {
		name: "",
		info: "",
		image: ""
	}

	$scope.clearText = function() {
		$scope.artist.name = "";
		$scope.artist.info = "";
		$scope.artist.image = "";
		$scope.message = "";
	}

	$scope.submit = function() {
		var newArtist = new Artist($scope.artist.name, $scope.artist.info, $scope.artist.image);
		
		if(repeatedName(newArtist.name, artists.getArtistList())) {
			$scope.message = "Já existe um artista com o nome " + newArtist.name + ".";
		} else {
			artists.pushArtist(newArtist);
			$scope.clearText();
			$scope.message = newArtist.name + " adicionado com sucesso.";
		}
		console.log($scope.message);
	}


	$scope.getArtistList = function() {
		return artists.getArtistList();
	}
});


app.controller('songController', function($scope, songs, albums) {
	$scope.title = "Músicas";
	$scope.message = '';

	$scope.song = {
		name: "",
		artist: "",
		album: "",
		year: "",
		duration: ""
	}

	$scope.clearText = function() {
		$scope.song.name = "";
		$scope.song.artist = "";
		$scope.song.album = "";
		$scope.song.year = "";
		$scope.song.duration = "";
		$scope.message = "";
	}

	$scope.submit = function() {
		if(confirm("Tem certeza que deseja adicionar essa música?")) {
			var newSong = new Song($scope.song.name, $scope.song.artist, $scope.song.album, $scope.song.year, $scope.song.duration);
			var album;

			if(!repeatedName($scope.song.album, albums.getAlbumList())) {
				album = new Album($scope.song.album, $scope.song.artist);
				albums.pushAlbum(album);
			} else {
				album = findByName($scope.song.album, albums.getAlbumList());
			}

			if(repeatedName($scope.song.name, album.songs)) {
				$scope.message = "Já existe " + $scope.song.name +" no álbum " + $scope.song.album + ".";
			} else {
				songs.pushSong(newSong);
				album.songs.push(newSong);
				$scope.clearText();
				$scope.message = newSong.name + " adicionada com sucesso.";
			}
			console.log($scope.message);
		}
	}

	$scope.getSongList = function() {
		return songs.getSongList();
	}
});

app.controller('searchController', function($scope, artists, albums) {
	$scope.title = "Pesquisar e gerenciar artistas";
	$scope.search = "";
	$scope.ratingForm = "";
	$scope.lastSongForm = "";

	$scope.getArtistList = function() {
		return artists.getArtistList();
	}

	$scope.artistClick = function(name) {
		$scope.ratingForm = "";
		$scope.lastSongForm = "";
		artists.addToDisplay(name);
	}

	$scope.getDisplay = function() {
		return artists.getDisplay();
	}

	$scope.albumsWithArtist = function(name) {
		return albums.albumsWithArtist(name);
	}

	$scope.toggleFav = function(name) {
		artists.toggleFav(name);
	}

	$scope.getFav = function(name) {
		var isFav = artists.isFav(name);
		return isFav ? "fa fa-star" : "fa fa-star-o";
	}

	$scope.getLastSong= function(name) {
		return artists.getLastSong(name);
	}

	$scope.setLastSong= function(name, lastSong) {
		artists.setLastSong(name, lastSong);
		$scope.lastSongForm = "";
	}

	$scope.getRating = function(name) {
		return artists.getRating(name);
	}

	$scope.setRating= function(name, rating) {
		artists.setRating(name, rating);
		$scope.ratingForm = "";
	}

});

app.controller('playlistController', function($scope, songs, playlists) {
	$scope.title = "Criar e gerenciar playlists";
	$scope.name = "";
	$scope.message = "";
	$scope.newSongForm = "";

	$scope.createPlaylist = function() {
		var newPlaylist = new Playlist($scope.name);

		if(repeatedName(newPlaylist.name, playlists.getPlaylists())) {
			$scope.message = "Já existe uma playlist com o nome " + newPlaylist.name + ".";
		} else {
			playlists.pushPlaylist(newPlaylist);
			$scope.name = "";
			$scope.message = newPlaylist.name + " adicionado com sucesso.";
		}
		console.log($scope.message);
	}

	$scope.getPlaylists = function() {
		return playlists.getPlaylists();
	}

	$scope.playlistClick = function(name) {
		$scope.newSongForm = "";
		playlists.addToDisplay(name);
	}

	$scope.getDisplay = function() {
		return playlists.getDisplay();
	}

	$scope.addSong = function(playlistName, songName) {
		$scope.newSongForm = "";
		playlists.addSong(playlistName, songName);
	}

	$scope.removeSong = function(playlistName, songName) {
		if(confirm("Tem certeza que deseja remover a música " + songName + "?")) playlists.removeSong(playlistName, songName);
	}
});


app.controller('tabController', ['$scope', function($scope) {
	$scope.currentVisibleCard = "";
	$scope.currentActiveCard = "";

	$scope.hide = function() {
		var artistCard = document.getElementById($scope.currentVisibleCard);
		var artistTab  = document.getElementById($scope.currentVisibleTab);

		artistCard.className += " not-active";
		artistTab.classList.remove("current-tab");

		$scope.currentVisibleCard = "";
		$scope.currentVisibleTab  = "";
	}

	$scope.update = function() {
		var artistCard = document.getElementById($scope.currentVisibleCard);
		var artistTab  = document.getElementById($scope.currentVisibleTab);

		artistCard.classList.remove("not-active");
		artistTab.className += " current-tab";
	}

	$scope.show = function(tab) {
		if($scope.currentVisibleCard == tab + "-card") {
			$scope.hide();
		} else {
			$scope.currentVisibleCard && $scope.hide();

			$scope.currentVisibleCard = tab + "-card";
			$scope.currentVisibleTab  = tab + "-tab";

			$scope.update();
		}
	}
}]);

var repeatedName = function(name, list) {
	var found = false;
	for(var i = 0; i < list.length; i++) {
		if(list[i].name == name) {
			found = true;
		}
	}
	return found;
}

var findByName = function(name, list) {
	for(var i = 0; i < list.length; i++) {
		if(list[i].name == name) {
			return list[i];
		}
	}
}