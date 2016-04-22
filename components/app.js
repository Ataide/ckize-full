// public/scripts/app.js

(function() {

    'use strict';

    angular
        .module('app', ['ui.router', 'ngMessages', 'satellizer', 'mgcrea.ngStrap', 'ngFileUpload', 'ngAnimate', 'angular-jwt', 'angular-loading-bar', 'ngImgCrop', 'angularMoment'])
        .config(['$stateProvider', '$urlRouterProvider', '$authProvider', 'API_URL', function($stateProvider, $urlRouterProvider, $authProvider, API_URL) {

            // Satellizer configuration that specifies which API
            // route the JWT should be retrieved from
            $authProvider.loginUrl = API_URL + '/authenticate';
            $authProvider.signupUrl = API_URL + '/register';

            // Redirect to the auth state if any other states
            // are requested other than users
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'components/login/loginView.html',
                    controller: 'AuthController as auth'
                })
                .state('home', {
                    url: '/home',
                    abstract: true,
                    templateUrl: 'components/home/homeView.html',
                    controller: 'HomeController as home'
                })

            .state('home.feeds', {
                url: '/feeds',
                templateUrl: 'components/home/feeds/feeds.html',
                controller: 'HomeController as home'
            })

            .state('home.friends', {
                url: '/friends',
                templateUrl: 'components/home/friends/friends.html',
                controller: 'HomeController as home'
            })

            .state('home.friend-requests', {
              url:'/friend-requests',
              templateUrl: 'components/home/friends/friend-requests.html',
              controller: 'HomeController as home'
            })

            .state('home.users', {
                url: '/users',
                templateUrl: 'components/home/users/users.html',
                controller: 'HomeController as home'
            })

            .state('profile', {
                    url: '/profile',
                    templateUrl: 'components/profile/profileView.html',
                    controller: 'ProfileController as profile'
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'components/register/registerView.html',
                    controller: 'RegisterController as register'

                });
        }])

    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('myInterceptors');

    }])

    .run(['$state', '$auth', '$rootScope', 'amMoment', function($state, $auth, $rootScope, amMoment) {
        amMoment.changeLocale('pt-br');

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options) {
                if (toState.name == 'login' && $auth.isAuthenticated()) {
                    event.preventDefault();
                    $state.go('home.feeds');
                } else {
                    return;
                }
            });
    }]);

    angular.module("app").constant("API_URL", 'http://localhost/api/api');

    angular.module('app').factory('chatService', function($rootScope) {
        var socket = io.connect('http://localhost:7000');
        return {
            on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });

})();
