var noteAppControllers = angular.module('noteAppControllers',[]);

noteAppControllers.controller('TodoCtrl', ['$scope','$http','DataService', function($scope, $http, DataService) {

    $scope.loadStuff = function() {
	    DataService.loadtags();
	    DataService.loadnotes();
	}
	
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
	$scope.data = DataService;
	
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
  
}]);


noteAppControllers.controller('TodoDetailCtrl', ['$scope', '$routeParams','DataService',
	function($scope, $routeParams, DataService) {
	
	console.log("Calling controller "+ $routeParams);
	
	
	$scope.note = DataService.getNoteById($routeParams.id);
	$scope.data = DataService;
/* 
 $scope.phones = Phone.query();
    $scope.orderProp = 'age';
	*/
  }]);


noteAppControllers.controller('TagCtrl', ['$scope','$http','DataService',function($scope, $http, DataService) {

/*
    $http.get('data/tags.json').success(function(data) {
       $scope.tags = data;
    });
	*/
	$scope.data = DataService;
	
	//$scope.tags = [{id: 1, title:"Roottag", children: [{id: 2, title:"childtag1"},{id: 3, title:"childtag2"}] }];

	$scope.filterbytag = function(tagid){
	    $scope.filterbytagid = tagid;
	};
	
	$scope.getTagById = function(id){
	   
	   return $scope.tags[0];
	}
	
	$scope.addSubFolder = function(){
		$scope.subFolders.push({name:$scope.subFolderName, containingFolder:$scope.topFolderName});
	};
	
	$scope.addTopFolder = function(){
		$scope.topFolders.push({name:$scope.topFolderName});
	};
	
}]);
	
