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
}]);