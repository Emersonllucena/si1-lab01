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
