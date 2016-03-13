angular.module('app')
  .config(['$httpProvider' , function($httpProvider){
    $httpProvider.interceptors.push(function($q) {
  return {
   request: function(config) {
     config.headers = config.headers || {};
     if (sessionStorage.getItem('satellizer_token')) {
               config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('satellizer_token');
           }
      return config;
    },

    response: function(response) {
       return response;
    },

    responseError: function(rejection){
      console.log(rejection);
    }
  };
});


  }]);
