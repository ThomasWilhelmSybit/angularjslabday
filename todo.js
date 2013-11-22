var noteApp = angular.module('noteApp',[]);

noteApp.controller('TodoCtrl', function($scope, $http) {
 
    $http.get('data/notes.json').success(function(data) {
       $scope.todos = data;
    });
	
	$scope.addTodo = function(){
		$scope.todos.push({text:$scope.todoText, name:$scope.todoName, containingFolder:askForFolderName(), done:false});
		$scope.todoText='';
	};

	/*
	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};
	*/

	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done) $scope.todos.push(todo)
		});
	};

	var askForFolderName = function(){
		prompt('What do you want your Folder to be named?');
	}
  
});


noteApp.controller('TagCtrl', function($scope, $http) {


    $http.get('data/tags.json').success(function(data) {
       $scope.tags = data;
    });
	
	
	//$scope.tags = [{id: 1, title:"Roottag", children: [{id: 2, title:"childtag1"},{id: 3, title:"childtag2"}] }];

	$scope.filterbytag = function(tagid){
	    $scope.filterbytagid = tagid;
	};
	
	$scope.addSubFolder = function(){
		$scope.subFolders.push({name:$scope.subFolderName, containingFolder:$scope.topFolderName});
	};
	
	$scope.addTopFolder = function(){
		$scope.topFolders.push({name:$scope.topFolderName});
	};
	
});
	
