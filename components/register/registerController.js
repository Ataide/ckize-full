(function(){

  'use strict'

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$http','$state'];

    function RegisterController($http,$state){
      var vm = this;

        $('body').removeClass('page-signin');
        $('body').addClass('page-signup');

      vm.register = function(){

        var credentials = {
          displayName: vm.user_name,
          email: vm.user_email,
          password: vm.user_password
        }

        //Use Satellizer's $auth service to signup
        $auth.signup(credentials).then(function(response){
          $state.go('login', {});
          alert('Registro Realizado com sucesso. Você poderá se logar agora.');
        }).catch(function(error){
          alert(error.data.error);
        });



      }

    }


})();
