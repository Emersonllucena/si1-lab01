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
