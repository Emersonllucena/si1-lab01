app.factory("loggedUser", function($http) {
	var currentUser = null;
	var artists = [];
	var songs = [];
	var playlists = [];
	var methods = {};

	methods.update = function() {
		return $http.get("/usuarioAtual").then(function suc(res) {
			currentUser = res;
		}, function err(res) {
			console.log("Erro no currentUser");
		});
	};

	methods.getUser = function() {
		return currentUser.data;
	};

	methods.getId = function() {
		console.log(currentUser.data.id);
		return currentUser.data.id;
	};

	methods.getName = function() {
		console.log(currentUser.data.nome);
		return currentUser.data.nome;
	};

	methods.updateArtists = function() {
		return $http.get("/artistaList/" + currentUser.data.id).then(function suc(res) {
			artists = res;
		}, function err(res) {
			console.log("Erro no updateArtists");
			console.log(res);
		});
	}

	methods.updateSongs = function() {
		return $http.get("/songList/" + currentUser.data.id).then(function suc(res) {
			songs = res;
		}, function err(res) {
			console.log("Erro no updateSongs");
			console.log(res);
		});
	}

	methods.updatePlaylists = function() {
		return $http.get("/playlists/" + currentUser.data.id).then(function suc(res) {
			playlists = res;
			console.log(res);
		}, function err(res) {
			console.log("Erro no updatePlaylists");
			console.log(res);
		});
	}

	methods.getArtists =  function() {
		return artists;
	};

	methods.getSongs =  function() {
		return songs;
	};

	methods.getPlaylists =  function() {
		return playlists;
	};

	return methods;
});