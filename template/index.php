<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>AngularJs Cliente Tcc - Ataide Bastos</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.min.css">
  </head>
  <body ng-app="authApp">
    <div id="wrapper" ng-controller="MainController">

    <div ng-include="'views/header-include.html'" ng-cloak ng-if="isAuthenticated()"></div>

      <div class="content">
        <div class="container">
          <div class="row">
            <div ui-view></div>
          </div>
        </div>
      </div>



    </div>



  </body>
  <script src="scripts/libs.min.js"></script>
  <script src="scripts/app.min.js"></script>
  <script>
  angular.module("authApp").constant("API_URL", 'api/');
  </script>


</html>
