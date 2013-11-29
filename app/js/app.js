

var noteApp = angular.module('noteApp', [
  'noteAppControllers',
  'noteAppServices',
  'ngRoute',
  'lvl.directives.dragdrop',
  'lvl.services',
  'angularLocalStorage',
  'textAngular'
]);

noteApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/todos', {
        templateUrl: 'partials/noteList.html',
      }).
      when('/todos/:id', {
        templateUrl: 'partials/noteDetail.html',
      }).
      otherwise({
        redirectTo: '/todos'
      });
  }]);
