
'use strict'
angular
    .module('ratemyself', [])
    .controller('articlesController', ($scope, $http, $window, $location) => {
        $scope.reload = () => {
            $http({
                method: 'GET',
                url: '/articles',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    email: email,
                    password: password
                }
            })
            .success( res => {
                alert(JSON.stringify(res.token))
                
            })
            .error( error => {
                alert('login failed: ' + JSON.stringify(error))
            })
        }
    })
