app.controller('artistController', ['$scope', function($scope) { 
	$scope.title = 'Artistas'; 
	$scope.message = ''

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

	$scope.showArtists = function() {
		for(var i = 0; i < artistList.length; i++) {
			$scope.showNewArtist(artistList[i]);
		}
	}

	$scope.showNewArtist = function(artistToShow) {
		var artistList = document.getElementById("artist-list");
		
		var newArtist = document.createElement("div"); 
		var wrapperLeft = document.createElement("div");
		var wrapperRight = document.createElement("img");

		newArtist.className += " artist";
		wrapperLeft.className += " name-info-wrapper";

		var name = document.createElement("div");
		var info = document.createElement("div");

		name.className += " name";
		info.className += " info";

		name.appendChild(document.createTextNode(artistToShow.name));
		info.appendChild(document.createTextNode(artistToShow.info));

		wrapperLeft.appendChild(name);
		artistToShow.info && wrapperLeft.appendChild(info);

		newArtist.appendChild(wrapperLeft);

		if(artistToShow.image) {
			wrapperRight.className += " img";
			wrapperRight.setAttribute("src", artistToShow.image);
			wrapperRight.setAttribute("alt", artistToShow.name);
			newArtist.appendChild(wrapperRight);
		}

		artistList.appendChild(newArtist);
	}

	$scope.submit = function() {
		var newArtist = new Artist($scope.artist.name, $scope.artist.info, $scope.artist.image);
		
		if(repeatedName(newArtist.name, artistList)) {
			console.log("Já existe um artista com o nome " + newArtist.name + ".");
			$scope.message = "Já existe um artista com o nome " + newArtist.name + ".";
		} else {
			artistList.push(newArtist);
			console.log("Adicionado novo artista: " + newArtist.name + " " + newArtist.info + " " + newArtist.image);
			$scope.clearText();
			$scope.message = newArtist.name + " adicionado com sucesso.";
			$scope.showNewArtist(newArtist);
		}
	}
}]);


app.controller('songController', ['$scope', function($scope) {
	$scope.title = "Músicas";
	$scope.message = ''

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

	$scope.showNewSong = function() {
		//TODO http-server -o
	}

	$scope.submit = function() {
		var newSong = new Song($scope.song.name, $scope.song.artist, $scope.song.album, $scope.song.year, $scope.song.duration);
		var album;

		if(!repeatedName($scope.song.album, albumList)) {
			album = new Album($scope.song.album, $scope.song.artist);
			albumList.push(album);
		} else {
			album = findByName($scope.song.album, albumList);
		}

		if(repeatedName($scope.song.name, album.songs)) {
			console.log("Já existe " + $scope.song.name +" no álbum " + $scope.song.album + ".");
			$scope.message = "Já existe " + $scope.song.name +" no álbum " + $scope.song.album + ".";
		} else {
			album.songs.push(newSong);
			console.log("Adicionada nova música: " + newSong.name + " de " + newSong.artist);
			$scope.clearText();
			$scope.message = newSong.name + " adicionada com sucesso.";
			$scope.showNewSong();
		}
	}
}]);


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
}]);


var artistList = [];
var albumList = [];

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