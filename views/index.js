'use strict'
angular.module('app', ['ngRoute'])
.config( ($httpProvider, $httpParamSerializerJQLikeProvider) => {
    $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get())
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
})
.config([$routeProvider, ($routeProvider) => {
    $routeProvider
        .when('/', {
            templateUrl: 'views/index.ejs',
            controller: 'homeController'
        })
        .when('/register', {
            templateUrl : 'views/register.ejs',
            controller  : 'registerController'
        })
        .otherwise({ redirect: '/' })
    })
}])
.config(['$locationProvider', ($locationProvider) => {
    $locationProvider.html5Mode(true)
}])
.controller('navController', ($scope, $window, $location) => {
    $scope.go = (location) => {
        $location.path('/register')
    }
})
.controller('homeController', ($scope, $http, $window) => {
    $scope.showDiv = true
    $scope.login = (email, password) => {
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
            $scope.showDiv = false
            $window.sessionStorage.token = res.token
        })
        .error( error => {
            alert('login failed: ' + JSON.stringify(error))
        })
    }
})
.controller('registerController', ($scope, $http, $window) => {

})
