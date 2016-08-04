encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.popover",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.popover",[
      $localPath.combineUrls("popover.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.ui.popover",[
      "angular.css",
      "ui.bootstrap.tpls",
      "ui.bootstrap.position",
      "ui.bootstrap.bindHtml",
      "ui.bootstrap.popover"
   ]).run(function() {
      log("Module: vsl.velocity.ui.popover");
   });

   module.controller("popoverController",popoverController);

   popoverController.$inject=['$scope'];

   function popoverController($scope) {
      log("Controller: vsl.velocity.ui.popover");

      return;
   }

   module.directive("popover",popover);

   popover.$inject=['$compile','$templateCache'];

   function popover($compile,$templateCache) {
      log("Directive: vsl.velocity.ui.popover");

      return {
         restrict: "A",
         controller: popoverController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.popover");

         return;
      }

   }

});
