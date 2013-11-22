var noteAppControllers = angular.module('noteAppControllers',[]);

noteAppControllers.controller('TodoCtrl', ['$scope','$http','TagService', function($scope, $http, TagService) {
 
    
 
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
	
	$scope.getTagFromId = function(id) {	
	    //TagService.addtags($scope); 
		
		//$scope.getTagById(id);
		//alert(tag);
		//console.log($scope.tags);
		
		//return $scope.tags[0].title;
	}

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


noteAppControllers.controller('TagCtrl', function($scope, $http) {


    $http.get('data/tags.json').success(function(data) {
       $scope.tags = data;
    });
	
	
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
	
});
	