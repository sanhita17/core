encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.inactivityModal",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.inactivityModal",[
      $localPath.combineUrls("inactivityModal.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.ui.inactivityModal",[
      "vsl.velocity.app.filters",
      "vsl.velocity.ui.popupModal"
   ]).run(function() {
      log("Module: vsl.velocity.ui.inactivityModal");
   });

   module.controller("inactivityModalController",inactivityModalController);

   inactivityModalController.$inject=['$scope'];

   function inactivityModalController($scope) {
      log("Controller: vsl.velocity.ui.inactivityModal");

      return;
   }

   module.service("inactivityModalService",inactivityModalService);

   inactivityModalService.$inject=['$q', 'temporaryStorage'];

   function inactivityModalService($q, temporaryStorage){
      log("Service: vsl.velocity.ui.inactivityModal");

      return;
   }

   module.directive("inactivityModal",inactivityModal);

   inactivityModal.$inject=[];

   function inactivityModal() {
      log("Directive: vsl.velocity.ui.inactivityModal");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("inactivityModal.html"),
         controller: inactivityModalController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.inactivityModal");

         return;
      }

   }

});
