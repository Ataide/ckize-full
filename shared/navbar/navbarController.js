(function(){

  'use strict'

  angular
    .module('app')
    .controller('navbarController' , navbarController);

    navbarController.$inject = ['$http','$auth','$state'];

    function navbarController($http,$auth,$state){

      var vm = this;

      vm.logOut = function(){
        $auth.logout();
        $state.go('login', {},{reload:true});
      }

    }

})();
