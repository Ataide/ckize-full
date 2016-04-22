(function() {

    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$auth', '$state','$http', 'chatService','userFactory'];

    function MainController($scope, $auth, $state,$http,chatService,userFactory) {
      var vm = this;

      vm.post = {};
      userFactory.getUserProfile().then(function(data){
        vm.post.poster_firstname = data.display_name;
      });
      console.log($auth.isAuthenticated());

        $scope.modal = {
            "title": "Title",
            "content": "Hello Modal<br />This is a multiline message!"
        };

        chatService.emit('register', {
            'userId': 1
        });

        chatService.on(1, function(data) {
            alert(data.message);
        });

        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };



    }
})();
