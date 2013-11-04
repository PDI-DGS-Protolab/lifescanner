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
    var tmp = ({id: this[i].id, title: this[i].title, logoUrl: this[i].channel.logo,
    description: this[i].description, checkboxState: false});
    if (tmp.description == "") tmp.description = "Sem descrição disponível."
    result.push(tmp);
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



var liveScannerApp = angular.module("liveScannerApp", ["wijmo"]);

liveScannerApp.factory("Data", function() {
  return {searchParameter: "", provisionarStyle: "", showsPropertiesOfInterest: 
  new ShowsArray(), markedShows: [], 
  defaultCommentValue: 5, comments: 
  [{hint: "For a live event or live sports - It's happening now!",
  comment: "It's happening now!"},
  {hint: "For a movie first on live tv, or the first series in season - Be the first to see it on TV", 
  comment: "Be the first to see it on TV"},
  {hint: "For a series in it's last season - See it before it's over",
  comment: "See it before it's over"},
  {hint: "For a final episode - The grand finale",
  comment: "The grand finale"},
  {hint: "For sports or football - Tonight's big game", 
  comment: "Tonight's big game"},
  {hint: "For anything else - Tonight's top picks",
  comment: "Tonight's top picks"}]}
});



function HeaderCtrl($scope, $http, Data) {
  $scope.getProvisionarButtonStatus = function() {
    if ($scope.data.markedShows.length < 5) {
      $scope.data.provisionarStyle = "";
      return true;
    }
    else {
      $scope.data.provisionarStyle = "validated";
      return false;
    }
  };

  $scope.provisionar = function() {
    if ($scope.data.markedShows.length > 10) {
      alert("Please select 5-10 suggestions");
    }
    else if ($scope.data.markedShows.length >= 5) {
      var result = [];

      for (var i = 0; i < $scope.data.markedShows.length; i++) {
        result.push({"epgContentId": $scope.data.markedShows[i].id, "promotedBy": "operator", "suggestion": $scope.data.markedShows[i].comment});
      }

      $http({
          url: "/suggestions/",
          method: "POST",
          data: result,
          headers: {"Content-Type" : "application/json"}
        }).success(function(data, status, headers, config) {
          alert("Number of suggestions updated: " + data.suggestionsUpdated);
        }).error(function(data, status, headers, config) {
          $scope.status = status;
          alert("Error sending the message")
        });
    }
  };
  
  $scope.data = Data;
};



function GenericListCtrl($scope, Data) {
  $scope.select = function(show) {
    if (show.comment !== undefined && show.comment !== "") {
      $scope.data.markedShows.push(show);
      show.checkboxState = false;

      var index = $scope.data.showsPropertiesOfInterest.indexOf(show);
      if (index > -1) {
        $scope.data.showsPropertiesOfInterest.splice(index, 1);
      }
    }
  };

  $scope.unSelect = function(show) {
    var index = $scope.data.markedShows.indexOf(show);
    if (index > -1) {
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



function MarkedListCtrl($scope, $injector, $http, Data) {
  $injector.invoke(GenericListCtrl, this, {$scope: $scope, Data: Data});

  $scope.changeComment = function(show,comment) {
    show.comment = comment;
  };

  $http({
    url: "/programs",
    method: "GET"
  }).success(function(data, status, headers, config) {
    $scope.data.showsPropertiesOfInterest = new ShowsArray(data).getShowsIdTitleLogoDescription().sortByTitle();
  }).error(function(data, status, headers, config) {
    $scope.status = status;
  });
};

MarkedListCtrl.prototype = Object.create(GenericListCtrl.prototype);