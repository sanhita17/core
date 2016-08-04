encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.tooltip",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.tooltip",[
      $localPath.combineUrls("tooltip.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.ui.tooltip",[
      "angular.css",
      "ui.bootstrap.tpls",
      "ui.bootstrap.position",
      "ui.bootstrap.bindHtml",
      "ui.bootstrap.tooltip"
   ]).run(function() {
      log("Module: vsl.velocity.ui.tooltip");
   });

   module.controller("tooltipController",tooltipController);

   tooltipController.$inject=['$scope'];

   function tooltipController($scope) {
      log("Controller: vsl.velocity.ui.tooltip");

      return;
   }

   module.directive("tooltip",tooltip);

   tooltip.$inject=[];

   function tooltip() {
      log("Directive: vsl.velocity.ui.tooltip");

      return {
         restrict: "AE",
         controller: tooltipController,
         scope: { settings: "=settings" },
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.tooltip");

         return;
      }

   }

});
