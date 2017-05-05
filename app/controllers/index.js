
'use strict'
angular
    .module('ratemyself', ['ngRoute'])
    .controller('homeController', ($scope, $http, $location) => {
        $scope.users = []
        $scope.reload = () => {
            $http({
                method: 'GET',
                url: 'http://localhost:8080/user/all?limit=50',
                headers: {'Content-Type': 'application/json'}
            })
            .success( res => {
                alert(JSON.stringify(res[0]))
                $scope.users = res.data
            })
            .error( error => {
                alert('query failed: ' + JSON.stringify(error))
            })
        }
    })
