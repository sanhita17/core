encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.pageHeader",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.pageHeader",[
      $localPath.combineUrls("pageHeader.css"),
      $localPath.combineUrls("../../resources/images/icons.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.pageHeader",[
      "ngAnimate",
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.filters"
   ]).run(function() {
      log("Module: vsl.velocity.ui.pageHeader");
   });

   module.controller("pageHeaderController",pageHeaderController);

   pageHeaderController.$inject=['$scope', '$http', '$timeout', 'temporaryStorage'];

   function pageHeaderController($scope, $http, $timeout, temporaryStorage){
      log("Controller: vsl.velocity.ui.pageHeader");

      $timeout(function() {
         $scope.uiReady = true;
      },0);

      $scope.importClicked = function() {
         $scope.$emit("importClicked");
      };

      $scope.printClicked = function() {
         $scope.$emit("printClicked");
      };

      $scope.plusClicked = function() {
         $scope.$emit("plusClicked");
      };

      $scope.$watch("settings.filterSelected", function(nv){
         if (nv) $scope.$emit("filterChanged", nv);
      });

      return;
   }

   module.directive("pageHeader",pageHeader);

   pageHeader.$inject=[];

   function pageHeader() {
      log("Directive: vsl.velocity.ui.pageHeader");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("pageHeader.html"),
         controller: pageHeaderController,
         scope: { settings: "=settings" },
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.pageHeader");

         return;
      }

   }

});
