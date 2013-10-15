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
      result.push({id: showsArray[show].id, title: showsArray[show].title, logoUrl: showsArray[show].channel.logo, description: showsArray[show].description});
    }
    return result;
  };

  function sortByProperty(showsArray, property) {
    showsArray.sort(function(showA, showB) {
      return showA[property].toLowerCase() > showB[property].toLowerCase();
    });
    return showsArray;
  };

  function sortByTitle(showsArray) {
    return sortByProperty(showsArray,"title");
  };

  $scope.getFilteredShows = function() {
    return filterByPattern(titleMatchesPattern, $scope.searchParameter, $scope.showsPropertiesOfInterest);
  };

  $scope.select = function(show) {
    if (angular.isDefined(show.comment) && show.comment.length > 0) {
      if ($scope.markedShows.indexOf(show) === -1) {
        $scope.markedShows.push(show);

        var index = $scope.showsPropertiesOfInterest.indexOf(show);
        if (index > -1) {
          $scope.showsPropertiesOfInterest.splice(index, 1);
        }
      }
    }
  };

  $scope.unSelect = function(show) {
    var index = $scope.markedShows.indexOf(show);
    if (index > -1) {
      $scope.markedShows.splice(index, 1);
      $scope.showsPropertiesOfInterest.push(show);
      sortByTitle($scope.showsPropertiesOfInterest);
    }
    console.log($scope.markedShows);
  };
  
  $scope.changeComment = function(show,comment) {
    if (angular.isDefined(comment) && comment.length > 0) {
      show.comment = comment;
    }
  };

/** I could not get this to work! **/
  $scope.getProvisionarButtonText = function() {
    if ($scope.markedShows.length < 5) {
      return "Provisionar";
    } else {
      return "Provisionar";
    }
  };

  $scope.provisionar = function() {
    if ($scope.markedShows.length >= 5) {
      var result = [];
      for (show in $scope.markedShows) {
        result.push({id: $scope.markedShows[show], comment: $scope.markedShows[show]});
      }
      console.log(result);
    }
  };

  $scope.searchParameter = "";

  $scope.rawShows = sortByTitle(getData());
  
  $scope.showsPropertiesOfInterest = getShowsIdTitleLogoDescription($scope.rawShows);

  $scope.markedShows = [];

}

