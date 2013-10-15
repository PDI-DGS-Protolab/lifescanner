Array.prototype.getShowsIdTitleLogoDescription = function () {
  var result = [];
  for (i=0; i<this.length; i++) {
    result.push({id: this[i].id, title: this[i].title, logoUrl: this[i].channel.logo, 
    description: this[i].description});
  }
  return result;
};

Array.prototype.filterByPattern = function(condition, pattern) {
  var result = [];
  for (i=0; i<this.length; i++) {
    if (condition(pattern,this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.sortByProperty = function(property) {
  this.sort(function(showA, showB) {
    return showA[property].toLowerCase() > showB[property].toLowerCase();
  });
  return this;
};

Array.prototype.sortByTitle = function() {
  return this.sortByProperty("title");
};

var liveScannerApp = angular.module("liveScannerApp", []);
liveScannerApp.factory("Data", function() {
  return {searchParameter: "", showsPropertiesOfInterest: getData().getShowsIdTitleLogoDescription().sortByTitle(), 
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
      $scope.data.showsPropertiesOfInterest.sortByTitle();
    }
  };

  $scope.data = Data;
};

function UnMarkedListCtrl($scope, Data) {
  this.prototype = new GenericListCtrl($scope, Data);

  function titleMatchesPattern(pattern, show) {
    var tmp = show.title.substr(0,pattern.length).toLowerCase();
    return tmp === pattern.toLowerCase();
  };

  $scope.getFilteredShows = function() {
    return $scope.data.showsPropertiesOfInterest.filterByPattern(titleMatchesPattern, $scope.data.searchParameter);
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