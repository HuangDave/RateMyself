
'use strict'
angular
    .module('ratemyself', [])
    .config( ($httpProvider, $httpParamSerializerJQLikeProvider) => {
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get())
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    })
    .controller('registerController', ($scope, $window) => {
        $scope.register = (user) => {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/auth/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    email: email,
                    password: password
                }
            })
            .success( res => {
                alert(JSON.stringify(res))
                $window.sessionStorage.token = res.token
            })
            .error( error => {
                alert('login failed: ' + JSON.stringify(error))
            })
        }
    })
