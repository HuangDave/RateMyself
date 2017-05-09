'use strict'
angular
    .module('ratemyself', [])
    .config( ($httpProvider, $httpParamSerializerJQLikeProvider) => {
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get())
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    })
    .controller('reviewController', ($scope, $http, $window, $location) => {
        $scope.rating = (firstname, lastname, description, rating) => {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/models/rating',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    description: description,
                    rating: rating
                }
            })
            .success( res => {
                alert(JSON.stringify(res))
                $window.sessionStorage.token = res.token
                $window.location.assign('/')

                //var landingUrl = "http://localhost:8080/views/success" + $window.$location.host + "/auth/login";
                //$window.$location.href = landingUrl;
                //$window.$location = '/index'
            }
            
            )
            .error( error => {
                alert('login failed: ' + JSON.stringify(error))
                window.alert("Not logged in");
            })
        }
    })