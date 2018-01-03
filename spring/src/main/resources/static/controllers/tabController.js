app.controller('tabController', function($scope, $http, artists, songs, playlists, loggedUser) {
	$scope.currentVisibleCard = "";
	$scope.currentActiveCard = "";
	
	$scope.loginMsg = "Login";

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
	
	$scope.login = function(user, password) {
		console.log(user);
		console.log(password);

		const requestBody =  {
			email: user,
			nome: user,
			senha: password
		};

		$scope.clearText();

		$http.post("/usuarioLogar", requestBody).then(function suc(res) {
			console.log("Login efetuado com sucesso");
			console.log(res);
			$scope.log(true);

		}, function err(res) {
			console.log("Erro na tentativa de login");
			console.log(res);
		});
	}

	$scope.registrar = function(email, user, password) {

		const requestBody =  {
			email: email,
			nome: user,
			senha: password
		};

		$scope.clearText();

		$http.post("/usuario", requestBody).then(function suc(res) {
			console.log("Registrado com sucesso");
			console.log(res);
			$scope.log(true);

		}, function err(res) {
			console.log("Erro na tentativa de registro");
			console.log(res);
		});
	}

	$scope.log = function(force) {
		loggedUser.update().then(function(){
			console.log("ok");
			if(loggedUser.getUser() != "" || force) {
				artists.updateArtistList();
				songs.updateSongList();
				playlists.updatePlaylists();
				$scope.loginMsg = loggedUser.getName();
			}
		});
	}

	$scope.abreRegistrar = function() {
		$("#loginModal").modal("hide");
		$("#registrarModal").modal("show");
	}

	$scope.clearText = function() {
		$scope.user = "";
		$scope.email = "";
		$scope.password = "";
	}
});