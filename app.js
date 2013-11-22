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
        controller: 'TodoCtrl'
      }).
      when('/todos/:todoId', {
        templateUrl: 'partials/todo-detail.html',
        controller: 'TodoDetailCtrl'
      }).
      otherwise({
        redirectTo: '/todos'
      });
  }]);