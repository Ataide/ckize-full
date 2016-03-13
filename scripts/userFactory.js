(function(){
  'use strict'

  angular
    .module('app')
    .factory('userFactory' , userFactory);

    userFactory.$inject = ['$http' , 'API_URL','Upload'];

    function userFactory($http, API_URL,Upload) {
      return {
        getUsers: getUsers,
        getUserProfile: getUserProfile,
        updateUserProfile: updateUserProfile,
        updateUserPicture: updateUserPicture
      };

      function getUsers() {
        return $http.get(API_URL+ '/authenticate')
            .then(getUsersComplete)
            .catch(getUsersFailed);

        function getUsersComplete(response){
          return response.data.results;
        }
        function getUsersFailed(error){

        }
      }

      function getUserProfile() {
        return $http.get(API_URL+ '/user/profile')
          .then(getUserProfileComplete)
          .catch(getUserProfileFailed);

        function getUserProfileComplete(response){
          return response.data;
        }
        function getUserProfileFailed(error){

        }

      }

      function updateUserProfile(user_profile) {
        console.log(user_profile);
        return $http.put(API_URL+ '/user/profile', user_profile)
          .then(updateUserProfileComplete)
          .catch(updateUserProfileFailed);

        function updateUserProfileComplete(response) {
          return response.data;
        }

        function updateUserProfileFailed(error) {

          alert('Nada Feito');
        }




      }

      function updateUserPicture(image){
        return  Upload.upload({
            url: API_URL+'/user/profile/update_picture',
            file: {file: image}
        }).then(updateUserPictureComplete);

      }

      function updateUserPictureComplete(response){
        return response.data;
      };
      function updateUserPictureFailed(error){
        alert('Nada Feito');
      }

    }








})();
