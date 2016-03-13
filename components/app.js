// public/scripts/app.js

(function() {

    'use strict';

    angular
        .module('app', ['ui.router', 'satellizer', 'mgcrea.ngStrap','ngFileUpload', 'ngAnimate', 'angular-jwt','angular-loading-bar','ngImgCrop'])
        .config(function($stateProvider, $urlRouterProvider, $authProvider, API_URL) {

            // Satellizer configuration that specifies which API
            // route the JWT should be retrieved from
            $authProvider.loginUrl = API_URL+'/authenticate';
            $authProvider.signupUrl = API_URL+'/register';

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
                  templateUrl: 'components/home/homeView.html',
                  controller: 'HomeController as home'
                })
                .state('profile',{
                  url: '/profile',
                  templateUrl: 'components/profile/profileView.html',
                  controller: 'ProfileController as profile'
                })
                .state('register', {
                  url: '/register',
                  templateUrl: 'components/register/registerView.html',
                  controller: 'RegisterController as register'

                });
        })

        .config(['$httpProvider', function($httpProvider) {
          $httpProvider.interceptors.push('myInterceptors');
}]);


})();
