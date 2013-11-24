var noteAppControllers = angular.module('noteAppControllers',[]);

noteAppControllers.controller('TodoCtrl', ['$scope','$http','DataService','storage', function($scope, $http, DataService, storage) {

	DataService.loadtags();	
    
	$scope.data = DataService;
	
    $scope.loadStuff = function() {
	  DataService.notes.length=0;
		dataloaded = storage.get('notes');
			console.log("Loaded "+dataloaded.length);
		    for (i=0;i<dataloaded.length;i++) {
                DataService.notes.push(dataloaded[i]);			  
           }
	}
	
	$scope.saveStuff = function() {
	
	    storage.set('notes',DataService.notes);
	    //DataService.savelocalnotes();
	}
	
	$scope.addTodo = function(){
		$scope.todos.push({text:$scope.todoText, name:$scope.todoName, containingFolder:askForFolderName(), done:false});
		$scope.todoText='';
	};
	
	//$scope.filterbytagid = DataService.filterbytagid;

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
  
     $scope.removetag = function(todo, tag){
        
        todo.tags.splice(todo.tags.indexOf(tag.id),1);
        
        console.log("Removing "+tag.id+" from "+todo.title);
     }
       
}]);


noteAppControllers.controller('TodoDetailCtrl', ['$scope', '$routeParams','DataService',
	function($scope, $routeParams, DataService) {
	
	console.log("Calling controller "+ $routeParams);

	console.log($routeParams.id);
	
	$scope.data = DataService;

	var id = $routeParams.id;
	
	if ($routeParams.id === "add"){
		console.log('worked');
		id = DataService.addnewnote();
		
	}

	$scope.note = DataService.getNoteById(id);

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
		DataService.filterbytagid.tags = tagid;
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
	
	$scope.dropped = function(dragEl, dropEl, tag){
	    var dragged = angular.element(dragEl);
		var noteid = dragged.attr('data-todo');
		
		console.log("Dropped "+tag.title);
		console.log("Dragged "+noteid);
		
		DataService.getNoteById(noteid).tags.push(tag.id);
		$scope.$apply();
	}
	
}]);
	
