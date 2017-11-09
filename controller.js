app.controller('artistController', function($scope, artists) { 
	$scope.title = 'Artistas'; 
	$scope.message = '';

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

	$scope.getSongList = function() {
		return songs.getSongList();
	}
});

app.controller('searchController', function($scope, artists) {
	$scope.title = "Pesquisar e gerenciar artistas";
	$scope.search = "";

	$scope.getArtistList = function() {
		return artists.getArtistList();
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

	$scope.showArtist = function() {
		if($scope.currentVisibleCard == "artist-card") {
			$scope.hide();
		} else {
			$scope.currentVisibleCard && $scope.hide();

			$scope.currentVisibleCard = "artist-card";
			$scope.currentVisibleTab  = "artist-tab";

			$scope.update();
		}
	}

	$scope.showSong = function() {
		if($scope.currentVisibleCard == "song-card") {
			$scope.hide();
		} else {
			$scope.currentVisibleCard && $scope.hide();

			$scope.currentVisibleCard = "song-card";
			$scope.currentVisibleTab  = "song-tab";

			$scope.update();
		}
	}

	$scope.showSearch = function() {
		if($scope.currentVisibleCard == "search-card") {
			$scope.hide();
		} else {
			$scope.currentVisibleCard && $scope.hide();

			$scope.currentVisibleCard = "search-card";
			$scope.currentVisibleTab  = "search-tab";

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