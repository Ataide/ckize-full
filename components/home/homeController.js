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
        vm.getPosts = getPosts;
        vm.getFriendsRequests = getAllFriendsRequests;
        vm.getFriendsList = getFriendsList;
        vm.getUsersList = getFriendsList;
        vm.removeFriend = removeFriend;

        function removeFriend(id){
          userFactory.removeFriendshipWith(id)
            .then(function(response){
              console.log(response);
              getFriendsList();
            });
        }

        userFactory.getUserProfile().then(function(data){
          vm.post.poster_firstname = data.display_name;
        });


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

        vm.requestFriend = function(id) {
          userFactory.createFriendshipRequestWith(id)
          .then(function(response){
            console.log(response);
          });
        };

        vm.rejectFriendRequest = function(id){
          userFactory.removeFriendshipRequestWith(id)
            .then(function(response){
              getAllFriendsRequests();
              alert(id);
            });
        };



        vm.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };


        function getPosts() {
            $http.get('http://localhost/api/api/posts').success(function(data) {
                vm.posts = data;
            });
        }

        function getFriendsList(){
          userFactory.getFriendsList()
            .then(function(response){
               vm.friendsList = response;
            });
        }

        function getAllFriendsRequests() {
          userFactory.getFriendsRequests()
            .then(function(response){
              vm.requestFriendList = response;
            });
        }

    }

})();
