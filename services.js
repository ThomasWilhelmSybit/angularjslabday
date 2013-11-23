var noteAppServices = angular.module('noteAppServices', []);
 
noteAppServices.factory('DataService', ['$http',
  function($http){
  
    var tags = [];  
    var tagsflat = [];  
  
    var notes = [];
	var notesflat = [];
  
	var data = {};
	
	data.tags = tags;
	data.tagsflat = tagsflat;
	data.notes = notes;
	data.notesflat = notesflat;
	
	/*
	tags.array = 	[
		{"id": 1,
        "title": "Action pending", 
        "children": [ {
			"id": 2,
			"title": "Action pending private" }
		]},
		
		{"id": 3,
		"title": "Archiv" 
        },
		
		{"id": 4,
		"title": "Completed" 
        },
		
		{"id": 5,
		"title": "Knowledge" 
        },
		
		{"id": 6,
		"title": "Work" 
        },
		
		{"id": 7,
		"title": "Deleted" 
        }
    ];
	*/
	
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
			  notesflat[dataloaded[i].id] = dataloaded[i];
           }
         });
	}
	
	return data;
	
  }]);