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