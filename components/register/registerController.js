(function(){

  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$http','$state','$auth'];

    function RegisterController($http,$state,$auth){
      var vm = this;

      $('body').removeClass('page-signin');
      $('body').addClass('page-signup');

      vm.register = function(){

        var credentials = {
          displayName: vm.user_name,
          email: vm.user_email,
          password: vm.user_password
        };

        $auth.signup(credentials).then(function(response){
          $state.go('login', {});
          alert('Registro Realizado com sucesso. Você poderá se logar agora.');
        }).catch(function(error){
          alert(error.data.error);
        });

      };

    }


})();
