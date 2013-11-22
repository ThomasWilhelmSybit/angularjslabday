var noteAppServices = angular.module('noteAppServices', []);
 
noteAppServices.factory('TagService', ['$http',
  function($http){
  
	var tags = {tags:[]};
	
	$http.get('data/tags.json').success(function(data) {
       tags.array = data;
    });
	
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
	
	tags.flat = function(){
				
		flatarray = [];				
		angular.forEach(this.array, function(value, key){
		   flatarray[value.id] = value;
		});
		
		return flatarray;
	}
	
	return tags;
	
  }]);