var noteAppControllers = angular.module('noteAppControllers',[]);

noteAppControllers.controller('NoteCtrl', ['$scope','$http','DataService','storage', function($scope, $http, DataService, storage) {

	DataService.loadtags();	
    
	$scope.dataService = DataService;
	
    $scope.loadNotesFromStorage = function() {
		DataService.notes.length=0;
		
		loadedNotes = storage.get('notes');
		console.log("loadNotesFromStorage has been called. Loaded "+loadedNotes.length+" Note(s) from storage");
		
		for (i=0;i<loadedNotes.length;i++) {
			DataService.notes.push(loadedNotes[i]);
        }
	}
	
	$scope.saveNotesToStorage = function() {
	    storage.set('notes',DataService.notes);
	}
	
	$scope.addTodo = function(){
		$scope.todos.push({text:$scope.todoText, name:$scope.todoName, containingFolder:askForFolderName(), done:false});
		$scope.todoText='';
	};
	
	$scope.filternotes = function(note){
	    console.log("filternotes has been called: TagIds("+note.tags+")");
	    
		DataService.filterbytagid.tags;
	    return $scope.containsAll(DataService.filterbytagid.tags, note.tags);
	}
	
	$scope.containsAll = function (needles, haystack){ 
        for(var i = 0 , len = needles.length; i < len; i++){
           if($.inArray(needles[i], haystack) == -1) 
				return false;
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
    
    $scope.removenote = function(note){
        DataService.notes.splice(DataService.notes.indexOf(note),1);        
    }
}]);

//-----------------------------------------------------------------------------------------------------------------------------------

noteAppControllers.controller('NoteDetailCtrl', ['$scope', '$routeParams','DataService', function($scope, $routeParams, DataService) {

	var id = $routeParams.id;
	console.log("NoteDetailCtrl has been called with Parameter="+id);
	
	if ($routeParams.id === "add"){
		id = DataService.addnewnote();
	}

	$scope.note = DataService.getNoteById(id);
}]);

//-----------------------------------------------------------------------------------------------------------------------------------

noteAppControllers.controller('TagCtrl', ['$scope','$http','DataService',function($scope, $http, DataService) {

	$scope.dataService = DataService;

	$scope.filterbytag = function(tagid){
	    console.log("filterbytag(tagId=" + tagid + ") has been called");
		
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
	
