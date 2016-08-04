encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console, arguments);
   }

   log("Script: vsl.velocity.ui.scrollableRegion", $localPath);

   var transitionTime = 1;

   var css = angular.css("vsl.velocity.ui.scrollableRegion", [
      $localPath.combineUrls("scrollableRegion.css"),
      $localPath.combineUrls("../../resources/images/icons.css")
   ], transitionTime);

   var module = angular.module("vsl.velocity.ui.scrollableRegion", [
      "vsl.velocity.ui.scrollableRegion"
   ]).run(function() {
      log("Module: vsl.velocity.ui.scrollableRegion");
   });

   module.controller("scrollableRegionController", scrollableRegionController);

   scrollableRegionController.$inject = ['$scope', '$window', '$timeout'];

   function scrollableRegionController($scope, $window, $timeout) {
      log("Controller: vsl.velocity.ui.scrollableRegion");

      $timeout(function() {
         var height = $window.innerHeight - angular.element(css.expand(".scroll-content")).position().top - 20;
         angular.element(css.expand(".scroll-content")).css('min-height', 500 + 'px');
         angular.element(css.expand(".scroll-content")).css('height', height + 'px');
         angular.element(css.expand(".scroll-content-privacyPolicy")).css('min-height', 400 + 'px');
         angular.element(css.expand(".scroll-content-privacyPolicy")).css('height', 400 + 'px');
      }, 0);

      return;
   }

   module.directive("scrollableRegion", scrollableRegion);

   scrollableRegion.$inject = [];

   function scrollableRegion() {
      log("Directive: vsl.velocity.ui.scrollableRegion");

      return {
         restrict: "E",
         transclude: true,
         replace: true,
         templateUrl: $localPath.combineUrls("scrollableRegion.html"),
         controller: scrollableRegionController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.scrollableRegion");

         attributes.$observe('pageHasSubnav', function(nv) {
            if (typeof(nv) !== 'undefined') {
               $scope.pageHasSubnav = true;
               angular.element(document).find("BODY").addClass("with-subnav");
            } else {
               angular.element(document).find("BODY").removeClass("with-subnav");
            }
         });

         attributes.$observe('marginBottom', function(nv) {
            if (typeof(nv) !== 'undefined') {
               $(element).css({ marginBottom: nv + "px" })
            }
         });

         return;
      }

   }

});
