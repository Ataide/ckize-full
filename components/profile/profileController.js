(function(){

  'use strict';

  angular
    .module('app')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$http', 'userFactory', '$modal', '$scope', '$timeout'];

    function ProfileController ($http, userFactory, $modal, $scope, $timeout) {
      var vm = this;
      var updateModal = $modal({scope: $scope, templateUrl: 'components/profile/modal.tpl.html', animation:'am-fade-and-slide-top',show: false});
      var updatePicuteModal = $modal({scope: $scope, templateUrl: 'components/profile/modalPictureUpdate.html', animation:'am-fade-and-slide-top', show:false});
      vm.titulo = 'Teste de ViewModel';
      vm.openUpdateModal = openUpdateModal;
      vm.openPictureUpdateModal = openPictureUpdateModal;

      vm.saveChanges = saveChanges;
      vm.savePicture = savePicture;

      initProfileView();

      /*
      * Aqui será realizado um log;
      */
      function initProfileView() {
        return getUserProfileData();
      }

      function getUserProfileData() {
        return userFactory.getUserProfile()
          .then(function(data){
            vm.data = data;
            return vm.data;
          });
      }

      function openUpdateModal() {
        initImageCropConfigs();
        vm.dataupdate = angular.copy(vm.data);
        updateModal.$promise.then(updateModal.show);
      }

      function saveChanges(){
        userFactory.updateUserProfile(vm.dataupdate).then(function(){
            initProfileView();
            updateModal.hide();
        });
      }

      function initImageCropConfigs() {
        $scope.myImage='';
        $scope.myCroppedImage='';
        $timeout(function() {
          var handleFileSelect=function(evt) {
            var file=evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
              $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
              });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
        });

      }

      function openPictureUpdateModal(){
        updatePicuteModal.$promise.then(updatePicuteModal.show);
        initImageCropConfigs();
      }

      function savePicture(myCroppedImage){
        userFactory.updateUserPicture(myCroppedImage).then(function(){
            initProfileView();
            updatePicuteModal.hide();
        });
        console.log(myCroppedImage);
      }

    }




})();
