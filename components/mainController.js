(function(){

    'use strict';

    angular
      .module('app')
      .controller('MainController' , MainController);

      function MainController($scope, $auth, $state){
        $scope.modal = {
        "title": "Title",
        "content": "Hello Modal<br />This is a multiline message!"
      };

        $scope.isAuthenticated = function(){
          return $auth.isAuthenticated();
        }

      }
})();