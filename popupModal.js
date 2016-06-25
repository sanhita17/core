encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console, arguments);
   }

   log("Script: vsl.velocity.ui.popupModal", $localPath);

   var transitionTime = 1;

   var css = angular.css("vsl.velocity.ui.popupModal", [
      $localPath.combineUrls("popupModal.css"),
      $localPath.combineUrls("../../resources/images/icons.css")
   ], transitionTime);

   var module = angular.module("vsl.velocity.ui.popupModal", [
      "ui.bootstrap"
   ]).run(function() {
      log("Module: vsl.velocity.ui.popupModal");
   });

   module.controller("popupModalController", popupModalController);

   popupModalController.$inject = ['$scope', '$interval'];

   function popupModalController($scope, $interval) {
      log("Controller: vsl.velocity.ui.popupModal");

      $scope.acceptClicked = function(event) {
         event.stopPropagation();
         $scope.processing = true;
         if ($scope.settings.keepOpenOnAccept) {
            $scope.$emit("vsl.velocity.ui.popupModal-acceptNoClose");
         } else {
            $scope.$parent.$close('accept');
         }
      };

      $scope.rejectClicked = function() {
         $scope.$parent.$close('reject');
      };

      $scope.closeClicked = function() {
         $scope.$parent.$dismiss('close');
      };

      $scope.doneProcessing = function() {
         $scope.processing = false;
      };

      $scope.$on("vsl.velocity.ui.popupModal-close", function() {
         $scope.$parent.$dismiss('close');
      });

      $scope.$on("vsl.velocity.ui.popupModal-done", function() {
         $scope.processing = false;
      });

      if ($scope.settings) {
         if ($scope.settings.closeAfter) {
            var modalWaitInterval = $interval(function() {
               $scope.$parent.$close('timeout');
            }, $scope.settings.closeAfter);
            $scope.$on('$destroy', function() {
               $interval.cancel(modalWaitInterval);
               modalWaitInterval = undefined;
            });
         }
      }


      return;
   }

   module.directive("popupModal", popupModal);

   popupModal.$inject = ['$timeout'];

   function popupModal($timeout) {
      log("Directive: vsl.velocity.ui.popupModal");

      return {
         restrict: "E",
         transclude: true,
         templateUrl: $localPath.combineUrls("popupModal.html"),
         controller: popupModalController,
         link: link,
         scope: { settings: "=" },
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.popupModal");

         $timeout(function() {
            angular.element(element).closest(angular.element(".modal")).css({ zIndex: 99999999 });
            if ($scope.settings) {
               if ($scope.settings.width) {
                  angular.element(element.parent().parent()).css({ width: $scope.settings.width + "px" });
               }
               if ($scope.settings.isBlue) {
                  angular.element(element).addClass(css.expand("-blue"));
               }
            }
         }, 0);

         $timeout(function() {
            angular.element(document).ready(function() {
               if ($scope.settings.action != "inactivityDetected") {
                  var height = angular.element(css.expand(".-content > DIV")).css("height");
                  angular.element(css.expand(".-content")).css({ height: height });
               }
            });
         }, 100);

         return;
      }

   }

});
