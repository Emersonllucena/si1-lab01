app.controller('songController', function($scope, songs, albums, loggedUser, $http) {
	$scope.title = "Musicas";
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
		if(confirm("Tem certeza que deseja adicionar essa musica?")) {
			var newSong = new Song($scope.song.name, $scope.song.artist, $scope.song.album, $scope.song.year, $scope.song.duration);
			var album;

			if(!repeatedName($scope.song.album, albums.getAlbumList())) {
				album = new Album($scope.song.album, $scope.song.artist);
				albums.pushAlbum(album);
			} else {
				album = findByName($scope.song.album, albums.getAlbumList());
			}

			if(repeatedName($scope.song.name, album.songs)) {
				$scope.message = "Ja existe " + $scope.song.name +" no album " + $scope.song.album + ".";
			} else {

				const requestBody =  {
					id_user: loggedUser.getId(),
					name: $scope.song.name,
					artist: $scope.song.artist,
					album: $scope.song.album,
					year: $scope.song.year,
					duration: $scope.song.duration
				};

				$http.post("/song", requestBody).then(function suc(res) {
					console.log("Registrado com sucesso");
					console.log(requestBody);
					console.log(res);

				}, function err(res) {
					console.log("Erro no /song");
					console.log(res);
				});

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
