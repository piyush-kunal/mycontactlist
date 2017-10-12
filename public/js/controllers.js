app.controller("NavCtrl", function($rootScope, $scope, $http, $location) {
  $scope.logout = function() {
    $http.post("/logout")
      .success(function() {
        $rootScope.currentUser = null;
        $location.url("/home");
      });
  }
});

app.controller("homectrl", function($scope) {
  $scope.heroImage = {
        background: 'url(/contactimg.jpg)'
    };
    console.log("hero img");
});

app.controller("SignUpCtrl", function($scope, $http, $rootScope, $location) {
  $scope.signup = function(user) {

    // TODO: verify passwords are the same and notify user
    if (user.password == user.password2) {
      $http.post('/signup', user)
        .success(function(user) {
          $rootScope.currentUser = user;
          $location.url("/contacts");
        });
    }
  }
});

app.controller("LoginCtrl", function($location, $scope, $http, $rootScope) {
  $scope.login = function(user) {
    $http.post('/login', user)
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.url("/contacts");
      });
  }
});

// Contacts Controller
app.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  var refresh = function() {
    $http.get('/contactlist').success(function(response) {
      console.log("I got the data I requested");
      $scope.contactlist = response;
      $scope.contact = "";
    });
  };
  refresh();

  $scope.addContact = function() {
    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact).success(function(response) {
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/contactlist/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id).success(function(response) {
      $scope.contact = response;
    });
  };

  $scope.update = function() {
    console.log($scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
      refresh();
    })
  };

  $scope.deselect = function() {
    $scope.contact = "";
  }
}]);﻿
