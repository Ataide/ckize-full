(function() {
    'use strict'

    angular
        .module('app')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http', 'API_URL', 'Upload', 'chatService'];

    function userFactory($http, API_URL, Upload, chatService) {

        return {
            getUsers: getUsers,
            getUserProfile: getUserProfile,
            updateUserProfile: updateUserProfile,
            updateUserPicture: updateUserPicture,
            getFriendsRequests: getFriendsRequests,
            createFriendshipRequestWith: createFriendshipRequestWith,
            removeFriendshipRequestWith: removeFriendshipRequestWith,
            getFriendsList: getFriendsList,
            createFriendshipWith: createFriendshipWith,
            removeFriendshipWith: removeFriendshipWith

        };

        function removeFriendshipWith(id){
          return $http.delete(API_URL+'/friends/'+id)
            .then(function(response){
              return response.data;
            })
            .catch();
        }

        function createFriendshipWith(id){
          var params = {'userId': id };
          return $http.post(API_URL+'/friends', params)
            .then(function(response){
              return response.data;
            })
            .catch();
        }

        function getFriendsList(){
          return $http.get(API_URL+'/friends')
            .then(function(response){
              return response.data;
            })
            .catch();
        }

        function removeFriendshipRequestWith(id) {
            return $http.delete(API_URL + '/friend-requests/'+id)
                .then(removeFriendshipRequestWithSuccess)
                .catch(removeFriendshipRequestWithError);

            function removeFriendshipRequestWithSuccess(response) {
                return response.data;
            }

            function removeFriendshipRequestWithError(error) {

            }
        }

        function createFriendshipRequestWith(id) {
            var params = {
                'userId': id
            };

            return $http.post(API_URL + '/friend-requests', params)
                .then(createFriendshipRequestWithSucess)
                .catch(createFriendshipRequestWithError);

            function createFriendshipRequestWithSucess(response) {
                return response.data;
            }

            function createFriendshipRequestWithError(error) {

            }
        }

        function getFriendsRequests() {
            return $http.get(API_URL + '/friend-requests')
                .then(getFriendsRequestsSuccess)
                .catch(getFriendsRequestsError);

            function getFriendsRequestsSuccess(response) {
                return response.data;
            }

            function getFriendsRequestsError(error) {

            }
        }



        function getUsers() {
            return $http.get(API_URL + '/authenticate')
                .then(getUsersComplete)
                .catch(getUsersFailed);

            function getUsersComplete(response) {
                return response.data.results;
            }

            function getUsersFailed(error) {}

        };

        function getUserProfile() {
            return $http.get(API_URL + '/user/profile')
                .then(getUserProfileComplete)
                .catch(getUserProfileFailed);

            function getUserProfileComplete(response) {
                return response.data;
            }

            function getUserProfileFailed(error) {

            }

        }

        function updateUserProfile(user_profile) {
            console.log(user_profile);
            return $http.put(API_URL + '/user/profile', user_profile)
                .then(updateUserProfileComplete)
                .catch(updateUserProfileFailed);

            function updateUserProfileComplete(response) {
                return response.data;
            }

            function updateUserProfileFailed(error) {

                alert('Nada Feito');
            }




        }

        function updateUserPicture(image) {
            return Upload.upload({
                url: API_URL + '/user/profile/update_picture',
                file: {
                    file: image
                }
            }).then(updateUserPictureComplete);

        }

        function updateUserPictureComplete(response) {
            return response.data;
        };

        function updateUserPictureFailed(error) {
            alert('Nada Feito');
        }

    }








})();
