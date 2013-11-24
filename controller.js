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
	
	$scope.filternotes = function(note){
	    console.log("Test:"+note);
	    DataService.filterbytagid.tags;
	    
	    //return DataService.filterbytagid.tags.compare(note.tags);
	    
	    return $scope.containsAll(DataService.filterbytagid.tags, note.tags);
	}
	
	$scope.containsAll = function (needles, haystack){ 
        for(var i = 0 , len = needles.length; i < len; i++){
           if($.inArray(needles[i], haystack) == -1) return false;
        }
  		return true;
	}
	
	$scope.archive = function() {
		var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.done) $scope.todos.push(todo)
		});
	};

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
	    if (DataService.filterbytagid.tags.indexOf(tagid) != -1){
	       DataService.filterbytagid.tags.splice(DataService.filterbytagid.tags.indexOf(tagid),1);
	    }else{
		   DataService.filterbytagid.tags.push(tagid);
		}
	};
	
	$scope.addSubFolder = function(){
		$scope.subFolders.push({name:$scope.subFolderName, containingFolder:$scope.topFolderName});
	};
	
	$scope.addTopFolder = function(){
		$scope.topFolders.push({name:$scope.topFolderName});
	};
	
	$scope.dropped = function(dragEl, dropEl, tag){
	    var dragged = angular.element(dragEl);
		var noteid = dragged.attr('data-todo');
		
		console.log("Dropped "+tag.id);
		console.log("Dragged "+noteid);
		
		note = DataService.getNoteById(noteid);
		if (note.tags.indexOf(tag.id) == -1){
		    note.tags.push(tag.id);
		}
		
		$scope.$apply();
	}
	
}]);
	
