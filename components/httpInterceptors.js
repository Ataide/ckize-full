(function(){

  'use strict';

  angular
    .module('app')
    .factory('myInterceptors', myInterceptors)
    .config(['$httpProvider',function($httpProvider) {
      $httpProvider.interceptors.push('myInterceptors');
    }]);

    myInterceptors.$inject = ['$q','$injector'];

    function myInterceptors($q, $injector){
      var $state;
      return {
        request: function(config){
          config.headers = config.headers || {};
          if (sessionStorage.getItem('satellizer_token')) {
                    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('satellizer_token');
                }
          return config;
        },
        response: function(response){
          //implements
          return response;
        },
        responseError: function(rejection){
          var $state = $state || $injector.get('$state');
          if(rejection.status == 400){
            $state.go('login',{});
          }
          return $q.reject(rejection);
        }
      };
    }

})();
