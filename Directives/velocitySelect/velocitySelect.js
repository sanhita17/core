encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console, arguments);
   }

   log("Script: vsl.velocity.ui.velocitySelect", $localPath);

   var transitionTime = 1;

   var css = angular.css("vsl.velocity.ui.velocitySelect", [
      $localPath.combineUrls("velocitySelect.css")
   ], transitionTime);

   var module = angular.module("vsl.velocity.ui.velocitySelect", []).run(function() {
      log("Module: vsl.velocity.ui.velocitySelect");
   });

   module.controller("velocitySelectController", velocitySelectController);

   velocitySelectController.$inject = ['$scope', '$interval', '$timeout'];

   function velocitySelectController($scope, $interval, $timeout) {

      log("Controller: vsl.velocity.ui.velocitySelect");

      $scope.search = function() {
         $scope.$emit("option:selected", { disableOKButton: true });

         if (!$scope.searchValue) {
            $scope.showOptions = false;
            return;
         }
         $scope.showOptions = true;
         angular.forEach($scope.options, function(option) {
            option.show = false;
            if (option.firstName.toLowerCase().indexOf($scope.searchValue.toLowerCase()) == 0 || option.lastName.toLowerCase().indexOf($scope.searchValue.toLowerCase()) == 0)
               option.show = true

         });
      }

      $scope.$on("success:addTeacherToClass", function() {
         $scope.searchValue = null;
         checkToOmit();
      });

      $scope.optionClicked = function(option) {
         $scope.searchValue = option.lastName + "," + option.firstName;
         $scope.showOptions = false;
         $scope.selectedOption = option;
         $scope.$emit("option:selected", { disableOKButton: false });
      }


      $scope.$on("success:removeTeacherFromClass", removeTeacherSuccess);

      function removeTeacherSuccess(event, teacher) {
         checkToOmit();
      }

      function checkToOmit() {
         angular.forEach($scope.options, function(option) {
            option.show = false;
            option.omit = false;
            angular.forEach($scope.omit, function(omit) {
               if (omit.uuid.localeCompare(option.uuid) === 0) option.omit = true;
            })
         })
      }

   }

   module.service("velocitySelectService", velocitySelectService);

   velocitySelectService.$inject = ['$q', 'temporaryStorage'];

   function velocitySelectService($q, temporaryStorage) {
      log("Service: vsl.velocity.ui.velocitySelect");

      return;
   }


   module.directive("velocitySelect", velocitySelect);

   velocitySelect.$inject = [];

   function velocitySelect() {
      log("Directive: vsl.velocity.ui.velocitySelect");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("velocitySelect.html"),
         controller: velocitySelectController,
         scope: {
            options: "=",
            selectedOption: "=ngModel",
            omit: "=",
            selectDisabled: '='
         },
         link: link,
         css: css
      };

      function link(scope, element, attributes) {
         log("Instance: vsl.velocity.ui.velocitySelect");
         scope.placeholder = attributes.placeholder;
         scope.class = attributes.class;
         scope.searchValue = "";
         scope.showOptions = false;

         angular.forEach(scope.options, function(option) {
            option.show = false;
            option.omit = false;
            angular.forEach(scope.omit, function(omit) {
               if (omit.uuid.localeCompare(option.uuid) === 0) option.omit = true;
            })
         })

         return;
      }

   }

});
