encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.views.teacher.classRoster.removeStudent",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.views.teacher.classRoster.removeStudent",[
      $localPath.combineUrls("removeStudent.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.views.teacher.classRoster.removeStudent",[
      "ui.bootstrap",
      "vsl.velocity.ui.popupModal",
      "vsl.velocity.views.teacher.classRoster"
   ]).run(function() {
      log("Module: vsl.velocity.views.teacher.classRoster.removeStudent");
   });

   module.controller("removeStudentController",removeStudentController);

   removeStudentController.$inject=['$scope', '$modalInstance'];

   function removeStudentController($scope, $modalInstance) {
      log("Controller: vsl.velocity.views.teacher.classRoster.removeStudent");

      return;
   }

   module.service("removeStudentService",removeStudentService);

   removeStudentService.$inject=['$q', 'temporaryStorage'];

   function removeStudentService($q, temporaryStorage){
      log("Service: vsl.velocity.views.teacher.classRoster.removeStudent");

      return;
   }

   module.directive("removeStudent",removeStudent);

   removeStudent.$inject=[];

   function removeStudent() {
      log("Directive: vsl.velocity.views.teacher.classRoster.removeStudent");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("removeStudent.html"),
         controller: removeStudentController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.views.teacher.classRoster.removeStudent");

         return;
      }

   }

});
