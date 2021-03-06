
'use strict'
angular
    .module('ratemyself', [])
    .config( ($httpProvider, $httpParamSerializerJQLikeProvider) => {
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get())
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    })
    .controller('loginController', ($scope, $http, $window, $location) => {
        $scope.login = (email, password) => {
            $http({
                method: 'POST',
                url: '/auth/login',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    email: email,
                    password: password
                }
            })
            .success( res => {
                $window.sessionStorage.uid = res.user.uid
                $window.sessionStorage.token = res.token
                $window.location.assign('/')
            })
            .error( error => {
                alert('login failed: ' + JSON.stringify(error))
            })
        }
    })
