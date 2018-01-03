app.controller('artistController', function($scope, $http, artists, loggedUser) { 
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
			$scope.message = "Ja existe um artista com o nome " + newArtist.name + ".";
		} else {
			const requestBody =  {
				id_user: loggedUser.getId(),
				name: $scope.artist.name,
				info: $scope.artist.info,
				url: $scope.artist.image
			};

			$http.post("/artista", requestBody).then(function suc(res) {
				console.log("Registrado com sucesso");
				console.log(requestBody);
				console.log(res);

			}, function err(res) {
				console.log("Erro no /artista");
				console.log(res);
			});


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