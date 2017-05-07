
//const baseURL = process.env.PORT == 8080 ? 'http://localhost:8080/' : 'https://cmpe138ratemyself.herokuapp.com/'

'use strict'
angular
    .module('ratemyself', [])
    .controller('homeController', ($scope, $http, $location) => {
        $scope.reload = () => {
            $http({
                method: 'GET',
                url: 'http://localhost:8080/user/all?limit=50',
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
