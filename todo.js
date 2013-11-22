var noteApp = angular.module('noteApp',[]);

function TodoCtrl ($scope) {
	
	$scope.todos = [
	{text:'learn angular', name:'angular', containingFolder:'mySubFolder', done:true},
	{text:'build an angular app', name:'app', containingFolder:'mySubFolder', done:false},
	{text:'foo!', name: 'foo', containingFolder:'myTestFolder', done:false}
	];

	$scope.addTodo = function(){
		$scope.todos.push({text:$scope.todoText, name:$scope.todoName, containingFolder:askForFolderName(), done:false});
		$scope.todoText='';
	};

	$scope.remaining = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};

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
};


function FolderCtrl($scope) {

	$scope.subFolders = [
	{name:'mySubFolder', containingFolder:'myTopFolder',contains:[]},
	{name:'myTestFolder',containingFolder:'notExistingTopFolder',contains:[]}
	];

	$scope.topFolders = [
	{name:'myTopFolder',contains:[]}
	];

	$scope.addSubFolder = function(){
		$scope.subFolders.push({name:$scope.subFolderName, containingFolder:$scope.topFolderName});
	};
	
	$scope.addTopFolder = function(){
		$scope.topFolders.push({name:$scope.topFolderName});
	};
	
};
	
