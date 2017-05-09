
//const baseURL = process.env.PORT == 8080 ? 'http://localhost:8080/' : 'https://cmpe138ratemyself.herokuapp.com/'

'use strict'
angular
    .module('ratemyself', [])
    .controller('homeController', ($scope, $http, $location) => {
        $scope.reload = () => {
            $http({
                method: 'GET',
                url: '/user/all?limit=50',
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
    .controller('searchController', ($scope, $http, $window) => {
        $scope.search = () => {
            if ($scope.name.length < 2) {
                $scope.query = []
                return
            }
            $http({
                method: 'GET',
                url: '/user/all?name='+$scope.name+'&limit=50',
                headers: {'Content-Type': 'application/json'}
            })
            .success( res => {
                $scope.query = res
            })
            .error( error => {
                alert('query failed: ' + JSON.stringify(error))
            })
        }
        $scope.select = (user) => {
            $window.location.assign('/showuser/user?id='+user.uid)
        }
    })
