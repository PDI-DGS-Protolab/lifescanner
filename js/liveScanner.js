function getShowsIdTitleLogoDescription(showsArray) {
  var result = [];
  for (show in showsArray) {
    result.push({id: showsArray[show].id, title: showsArray[show].title, logoUrl: showsArray[show].channel.logo, 
    description: showsArray[show].description});
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

var liveScannerApp = angular.module("liveScannerApp", []);
liveScannerApp.factory("Data", function() {
  return {searchParameter: "", showsPropertiesOfInterest: sortByTitle(getShowsIdTitleLogoDescription(getData())), 
    markedShows: []};
});

function HeaderCtrl($scope, Data) {
    $scope.getProvisionarButtonText = function() {
    if ($scope.data.markedShows.length < 5) {
      return "5";
    } else {
      return "Provisionar";
    }
  };

  $scope.provisionar = function() {
    if ($scope.data.markedShows.length >= 5) {
      var result = [];
      for (show in $scope.data.markedShows) {
        result.push({id: $scope.data.markedShows[show], comment: $scope.data.markedShows[show]});
      }
      console.log(result);
    }
  };

  $scope.data = Data;
};

function GenericListCtrl($scope, Data) {
  $scope.select = function(show) {
    if (angular.isDefined(show.comment) && show.comment.length > 0) {
      if ($scope.data.markedShows.indexOf(show) === -1) {
        $scope.data.markedShows.push(show);

        var index = $scope.data.showsPropertiesOfInterest.indexOf(show);
        if (index > -1) {
          $scope.data.showsPropertiesOfInterest.splice(index, 1);
        }
      }
    }
  };

  $scope.unSelect = function(show) {
    var index = $scope.data.markedShows.indexOf(show);
    if (index > -1) {
      show.comment = "";
      $scope.data.markedShows.splice(index, 1);
      $scope.data.showsPropertiesOfInterest.push(show);
      sortByTitle($scope.data.showsPropertiesOfInterest);
    }
    console.log($scope.data.markedShows);
  };

  $scope.data = Data;
};

function UnMarkedListCtrl($scope, Data) {
  this.prototype = new GenericListCtrl($scope, Data);

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

  $scope.getFilteredShows = function() {
    return filterByPattern(titleMatchesPattern, $scope.data.searchParameter, $scope.data.showsPropertiesOfInterest);
  };
};

function MarkedListCtrl($scope, Data) {
  this.prototype = new GenericListCtrl($scope, Data);

  $scope.changeComment = function(show,comment) {
    if (angular.isDefined(comment) && comment.length > 0) {
      show.comment = comment;
    }
  };
};