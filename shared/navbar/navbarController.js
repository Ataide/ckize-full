(function(){

  'use strict';

  angular
    .module('app')
    .controller('NavbarController' , NavbarController);

    NavbarController.$inject = ['$http','$auth','$state'];

    function NavbarController($http,$auth,$state){
      var vm = this;

      vm.logOut = function(){
        $auth.logout();
        $state.go('login', {},{reload:true});
      };

    }

})();
