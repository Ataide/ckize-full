// public/scripts/userController.js

(function() {

    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$auth'];

    function HomeController($http, $auth) {

        var vm = this;

        vm.users = {};
        vm.error = {};

        vm.isAuthenticated = function(){
          return $auth.isAuthenticated();
        };

        vm.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get('api/authenticate').success(function(users) {
                vm.users = users;
            }).error(function(error) {
                vm.error = error;
            });
        };
    }

})();
