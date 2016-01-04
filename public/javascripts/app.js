var app = angular.module('lunchy', ['ui.router']);

app.factory('auth', ['$http', '$window', function($http, $window){
    var auth = {};
    
    auth.saveToken = function(token){
        $window.localStorage['lunchy-token'] = token;
    };
    
    auth.getToken = function (){
    return $window.localStorage['lunchy-token'];
  };

  auth.isLoggedIn = function(){
    var token = auth.getToken();

    if(token){
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function(){
    if(auth.isLoggedIn()){
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  auth.register = function(user){
    return $http.post('/register', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user){
    return $http.post('/login', user).success(function(data){
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function(){
    $window.localStorage.removeItem('lunchy-token');
  };

  return auth;    
}]);

app.controller('IndexCtrl', [
    '$scope',
    '$state',
    'auth',
    function($scope, $state, auth){
        $scope.user = {};
    
        $scope.register = function(){
            auth.register($scope.user).error(function(error){
            $scope.error = error; console.log(error);
            }).then(function(){
            $state.go('luncher');
            });
        };
    
        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
            $scope.error = error;
            }).then(function(){
            $state.go('home');
            });
        };
    }
]);


app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
    url: '',
    templateUrl: 'templates/index.html',
    controller: 'IndexCtrl'
    })
    .state('luncher', {
      url: '/luncher',
      templateUrl: 'templates/luncher.html'
    })
    .state('login', {
  url: '/login',
  templateUrl: 'templates/login.html'
})
    .state('registration', {
  url: '/registration',
  templateUrl: 'templates/registration.html'
});
    
  $urlRouterProvider.otherwise('index');
}]);
