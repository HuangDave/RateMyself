
'use strict'
angular
    .module('ratemyself', [])
    .config( ($httpProvider, $httpParamSerializerJQLikeProvider) => {
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get())
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    })
    .controller('registerController', ($scope, $http, $window, $location) => {
        $scope.register = (name, email, password, gender) => {
            alert(gender)
            $http({
                method: 'POST',
                url: '/auth/register',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    name: name,
                    email: email,
                    password: password,
                    gender: gender
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
