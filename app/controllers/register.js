
'use strict'
angular
    .module('ratemyself', [])
    .config( ($httpProvider, $httpParamSerializerJQLikeProvider) => {
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get())
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    })
    .controller('registerController', ($scope, $http, $window, $location) => {
        $scope.register = (name, email, password) => {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/auth/register',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            })
            .success( res => {
                alert(JSON.stringify(res))
                $window.sessionStorage.token = res.token
                $window.location.assign('/')
            })
            .error( error => {
                alert('login failed: ' + JSON.stringify(error))
            })
        }
    })
