var noteAppServices = angular.module('noteAppServices', []);
 
noteAppServices.factory('TagService', ['$http',
  function($http){
  
    //return {tags:[{id: 1, title:"Roottag", children: [{id: 2, title:"childtag1"},{id: 3, title:"childtag2"}] }]};
	
	return {addtags: function(scope){
	
		$http.get('data/tags.json').success(function(data) {
			scope.tags = data;
		})} };
	
	
  }]);