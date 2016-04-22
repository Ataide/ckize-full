(function() {

    'use strict';

    angular
        .module('app')
        .controller('AuthController', AuthController);

        AuthController.$inject = ['$auth', '$state', '$timeout','userFactory','$scope'];


    function AuthController($auth, $state, $timeout,userFactory,$scope) {

        var vm = this;
        vm.login = true;


        $scope.$on('cfpLoadingBar:completed', function () {
            vm.loading = false;
        });

        $scope.$on('cfpLoadingBar:started', function () {
            vm.loading = true;
        });

        $scope.$on('cfpLoadingBar:loading', function () {
            console.log(' ----------- loading bar loading');
        });

        // userFactory.getUsers().then(function(response){
        //   console.log(response);
        // });
        // console.log($state);

          $('body').removeClass('page-signup');
          $('body').addClass('page-signin');

        vm.error = {};

        vm.login = function(loginForm) {

          if(loginForm.$valid) {
            var credentials = {
              email: vm.email,
              password: vm.password
            };

            $auth.login(credentials).then(function(data) {
              $('body').removeClass('page-signin');
              $state.go('home.feeds', {});
            }).catch(function (response) {
              vm.error = 'Usuário ou Senha Inválido(s)';

              $timeout(function() {
                delete vm.error;
                delete vm.email;
                delete vm.password;
              }, 2000);

            });
          }

        };

    }

})();
