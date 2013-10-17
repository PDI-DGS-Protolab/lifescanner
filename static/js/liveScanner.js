function ShowsArray(array) {
  if (array !== undefined) {
    for (var i = 0; i < array.length; ++i) {
      this.push(array[i]);
    }
  }
};

ShowsArray.prototype = [];

ShowsArray.prototype.getShowsIdTitleLogoDescription = function () {
  var result = new ShowsArray();
  for (i=0; i<this.length; i++) {
    result.push({id: this[i].id, title: this[i].title, logoUrl: this[i].channel.logo, 
    description: this[i].description, checkboxState: false});
  }
  return result;
};

ShowsArray.prototype.filterByPattern = function(condition, pattern) {
  var result = [];
  for (i=0; i<this.length; i++) {
    if (condition(pattern,this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

ShowsArray.prototype.sortByProperty = function(property) {
  this.sort(function(showA, showB) {
    return showA[property].toLowerCase() > showB[property].toLowerCase();
  });
  return this;
};

ShowsArray.prototype.sortByTitle = function() {
  return this.sortByProperty("title");
};

var liveScannerApp = angular.module("liveScannerApp", []);
liveScannerApp.factory("Data", function() {
  return {searchParameter: "", provisionarStyle: "", showsPropertiesOfInterest: new ShowsArray(getData()).getShowsIdTitleLogoDescription().sortByTitle(), 
    markedShows: []};
});

function HeaderCtrl($scope, Data) {
  $scope.getProvisionarButtonText = function() {
    if ($scope.data.markedShows.length < 5) {
      $scope.data.provisionarStyle = "";
      return "Marcar 5 programas";
    } 
    else {
      $scope.data.provisionarStyle = "validated";
      return "Provisionar";
    }
  };

  $scope.provisionar = function() {
    if ($scope.data.markedShows.length >= 5) {
      var result = [];
      for (var i = 0; i < $scope.data.markedShows.length; i++) {
        result.push({id: $scope.data.markedShows[i], comment: $scope.data.markedShows[i]});
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
        show.checkboxState = false;

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

  $scope.toggleCheckbox = function(show) {
      show.checkboxState = !show.checkboxState;
  };

  $scope.data = Data;
};


function UnMarkedListCtrl($scope, $injector, Data) {
  $injector.invoke(GenericListCtrl, this, {$scope: $scope, Data: Data});

  function titleMatchesPattern(pattern, show) {
    var tmp = show.title.substr(0,pattern.length).toLowerCase();
    return tmp === pattern.toLowerCase();
  };

  $scope.getFilteredShows = function() {
    return $scope.data.showsPropertiesOfInterest.filterByPattern(titleMatchesPattern, $scope.data.searchParameter);
  };
};

UnMarkedListCtrl.prototype = Object.create(GenericListCtrl.prototype);

function MarkedListCtrl($scope, $injector, Data) {
  $injector.invoke(GenericListCtrl, this, {$scope: $scope, Data: Data});

  $scope.changeComment = function(show,comment) {
    if (angular.isDefined(comment) && comment.length > 0) {
      show.comment = comment;
    }
  };
};

MarkedListCtrl.prototype = Object.create(GenericListCtrl.prototype);