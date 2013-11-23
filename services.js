var noteAppServices = angular.module('noteAppServices', []);
 
noteAppServices.factory('DataService', ['$http',
  function($http){
  
    var tags = [];  
    var tagsflat = [];  
  
    var notes = [];
	
	var data = {};
	
	data.tags = tags;
	data.tagsflat = tagsflat;
	data.notes = notes;
	
	data.flatentags = function(){
					
		angular.forEach(this.tags, function(value, key){
		   this.tagsflat[value.id] = value;
		});

	}
	
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
	
	return data;
	
  }]);