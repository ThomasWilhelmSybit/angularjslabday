var noteAppServices = angular.module('noteAppServices', []);
 
noteAppServices.factory('DataService', ['$http','uuid',
  function($http,uuid){
  
	var dataService = {};
	var tags = [];  
    var notes = [];
	
	dataService.tags = tags;
	dataService.notes = notes;
	dataService.filterbytagid = {tags:[]};

	dataService.loadtags = function() {
	
	   $http.get('data/tags.json').success(function(dataloaded) {
          console.log("Loading Tags...");
		  //tags = dataloaded;
		  tags.length = 0;
		  for (i=0;i<dataloaded.length;i++) {
             tags.push(dataloaded[i]);
          }
		  console.log("..." + dataloaded.length + " Tags loaded");
       });
	}
	
	dataService.loadnotes = function() {
		 $http.get('data/notes.json').success(function(dataloaded) {
           console.log("Loading Notes...");
		   notes.length = 0;
		   for (i=0;i<dataloaded.length;i++) {
              notes.push(dataloaded[i]);			  
           }
		   console.log("..." + dataloaded.length + " Notes loaded");
         });
	}
	
	dataService.savelocalnotes = function() {
		
		console.log("Saving");
		if(typeof(Storage)!=="undefined"){
		    localStorage.clear();
		    localStorage.setItem("notesdata",{test: "tsst", test2: "dksjd"});
		}else{
		    console.log ("Local storage not available");
		}
	}
	
	dataService.loadlocalnotes = function() {
		
		if(typeof(Storage)!=="undefined"){
		    notes.length = 0;
		    dataloaded = localStorage.notesdata;
			console.log("Loaded "+dataloaded.length);
		    for (i=0;i<dataloaded.length;i++) {
              notes.push(dataloaded[i]);			  
           }
		}else{
		    console.log ("Local storage not available");
		}
		
	}
	
	dataService.getNoteById = function(id){

		for (i=0;i<notes.length;i++) {
          if (notes[i].id == id) return notes[i];   
        }
	}
	
	dataService.getTagById = function(id){
		
		for (i=0;i<tags.length;i++) {
          if (tags[i].id == id) return tags[i]; 
          
          if (tags[i].children && tags[i].children.length>0){
               for (c=0;c<tags[i].children.length;c++) {
                   if (tags[i].children[c].id == id) return tags[i].children[c];
               }
          }  
        }
	}

	dataService.addnewnote = function() {
		var noteId = uuid.new();

		notes.push(
			{
				id: noteId, 
				title: '',
		        content: '', 
			    creation: '', 
			    modification: '', 
			    tags: [1]
			}
		); 
		
		return noteId;
	}

	return dataService;
	
  }]);
