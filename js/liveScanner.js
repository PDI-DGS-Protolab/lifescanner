function ListCtrl($scope, $http) {
	function titleMatchesPattern(pattern, show) {
		var tmp = show.title.substr(0,pattern.length).toLowerCase();
		return tmp === pattern.toLowerCase();
	};

	function filterByPattern(condition, pattern, showsArray) {
		var result = [];
		for (show in showsArray) {
			if (condition(pattern,showsArray[show])) {
				result.push(showsArray[show]);
			}
		}
		return result;
	};

	function getProperties(showsArray, property) {
		var result = [];
		for (show in showsArray) {
			result.push(showsArray[show][property]);
		}
		return result;
	};

	function getProperty(showId, property) {
		return $scope.rawShows[showId][property];
	};

	function getShowsIdTitleLogoDescription(showsArray) {
		var result = [];
		for (show in showsArray) {
			console.log(showsArray[show].channel.logo);
			result.push({id: showsArray[show].id, title: showsArray[show].title, logoUrl: showsArray[show].channel.logo, description: showsArray[show].description});
		}
		return result;
	};

	$scope.searchParameter = "";

	$scope.rawShows = getData();
 	
 	$scope.showsPropertiesOfInterest = getShowsIdTitleLogoDescription($scope.rawShows);

	 $scope.getFilteredShows = function() {
		return filterByPattern(titleMatchesPattern, $scope.searchParameter, $scope.showsPropertiesOfInterest);
	};
}