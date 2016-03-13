(function() {

    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);


    function AuthController($auth, $state, $timeout,userFactory) {

        var vm = this;

        // userFactory.getUsers().then(function(response){
        //   console.log(response);
        // });
        // console.log($state);

          $('body').removeClass('page-signup');
          $('body').addClass('page-signin');


        vm.error;

        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            $auth.login(credentials).then(function(data) {
                $('body').removeClass('page-signin');
                $state.go('home', {});
            }).catch(function (response) {
              vm.error = 'Usuário ou Senha Inválido(s)';

              $timeout(function() {
                delete vm.error;
                delete vm.email;
                delete vm.password;
              }, 2000);

              });
        }

    }

})();
