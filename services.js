var noteAppServices = angular.module('noteAppServices', []);
 
noteAppServices.factory('DataService', ['$http','uuid',
  function($http,uuid){
  
	var tags = [];  
    var notes = [];
	var data = {};
	
	data.tags = tags;
	data.notes = notes;
	data.filterbytagid = {};

	data.loadtags = function() {
	
	   $http.get('data/tags.json').success(function(dataloaded) {
          console.log("Loading tags");
		  //tags = dataloaded;
		  tags.length = 0;
		  for (i=0;i<dataloaded.length;i++) {
             tags.push(dataloaded[i]);
          }
       });
	}
	
	data.loadnotes = function() {
		 $http.get('data/notes.json').success(function(dataloaded) {
           console.log("Loading notes");
		   notes.length = 0;
		   
		   for (i=0;i<dataloaded.length;i++) {
              notes.push(dataloaded[i]);			  
           }
         });
	}
	
	data.getNoteById = function(id){

		for (i=0;i<notes.length;i++) {
          if (notes[i].id == id) return notes[i];   
        }
	}
	
	data.getTagById = function(id){
		
		for (i=0;i<tags.length;i++) {
          if (tags[i].id == id) return tags[i];   
        }
	}

	data.addnewnote = function() {
		var noteId = uuid.new();
	
		console.log(noteId);
	
		notes.push({id: noteId, 
			    title: '',
		            content: '', 
			    creation: '', 
			    modification: '', 
			    tags: []}); 
		
		return noteId;
	}

	return data;
	
  }]);
