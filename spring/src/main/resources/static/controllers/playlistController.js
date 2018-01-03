app.controller('playlistController', function($scope, songs, playlists, loggedUser, $http) {
	$scope.title = "Criar e gerenciar playlists";
	$scope.name = "";
	$scope.message = "";
	$scope.newSongForm = "";

	$scope.createPlaylist = function() {
		var newPlaylist = new Playlist($scope.name);

		if(repeatedName(newPlaylist.name, playlists.getPlaylists())) {
			$scope.message = "Ja existe uma playlist com o nome " + newPlaylist.name + ".";
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
		const requestBody =  {
			id_user: loggedUser.getId(),
			name: playlistName,
			song: songName
		};

		$http.post("/playlist", requestBody).then(function suc(res) {
			console.log("Registrado com sucesso");
			console.log(requestBody);
			console.log(res);

		}, function err(res) {
			console.log("Erro no /playlist");
			console.log(res);
		});

		$scope.newSongForm = "";
		playlists.addSong(playlistName, songName);
	}

	$scope.removeSong = function(playlistName, songName) {
		if(confirm("Tem certeza que deseja remover a musica " + songName + "?")) playlists.removeSong(playlistName, songName);
	}
});