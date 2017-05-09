

var app = angular.module('ratemyself', [])
   app.controller('users', ($scope, $http, $location) => {
        $http.get('http://localhost:8080/user/all')
        .success(function(response){
        	$scope.persons = response.records;
        });
    });