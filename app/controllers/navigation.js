
'use strict'
angular
    .module('ratemyself', [])
    .controller('navController', ($scope, $http, $location) => {
        $scope.search = (name) => {
            $http({
                method: 'GET',
                url: 'http://localhost:8080/user/all?name='+name+'limit=50',
                headers: {'Content-Type': 'application/json'}
            })
            .success( res => {
                $scope.users = res
            })
            .error( error => {
                alert('query failed: ' + JSON.stringify(error))
            })
        }
    })
