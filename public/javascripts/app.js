var app = angular.module('lunchy', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('index', {
    url: '',
    templateUrl: 'templates/index.html'
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
