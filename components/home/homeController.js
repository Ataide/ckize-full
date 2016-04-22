// public/scripts/userController.js

(function() {

    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$auth','userFactory'];

    function HomeController($http, $auth,userFactory) {

        var vm = this;
        vm.post = {};
        vm.users = {};
        vm.error = {};
        vm.message = '';

        userFactory.getUserProfile().then(function(data){
          vm.post.poster_firstname = data.display_name;
        });

        function getPosts() {
            $http.get('http://localhost/api/api/posts').success(function(data) {
                vm.posts = data;
            });
        };

        vm.goTest = function() {
            $http.post('http://localhost/api/api/posts', vm.post).success(function(data) {
                getPosts();
                delete vm.post.body;
            });
        };

        vm.getUsers = function(){
          $http.get('http://localhost/api/api/authenticate').success(function(data) {
            vm.users = data;
          });
        };






        vm.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };

        // vm.getUsers = function() {
        //
        //     // This request will hit the index method in the AuthenticateController
        //     // on the Laravel side and will return the list of users
        //     $http.get('api/authenticate').success(function(users) {
        //         vm.users = users;
        //     }).error(function(error) {
        //         vm.error = error;
        //     });
        // };

        getPosts();
    }

})();
