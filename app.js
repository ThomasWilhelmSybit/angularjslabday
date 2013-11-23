var noteApp = angular.module('noteApp', [
  'ngRoute',
  'noteAppControllers',
  'noteAppServices'
]);

noteApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/todos', {
        templateUrl: 'partials/todo-list.html',
      }).
      when('/todos/:id', {
        templateUrl: 'partials/todo-detail.html',
      }).
      otherwise({
        redirectTo: '/todos'
      });
  }]);
