encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.progressBar",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.progressBar",$localPath.combineUrls("progressBar.css"), transitionTime);

   var module=angular.module("vsl.velocity.ui.progressBar",[
   ]).run(function() {
      log("Module: vsl.velocity.ui.progressBar");
   });

   module.controller("progressBarController",progressBarController);

   progressBarController.$inject=['$scope'];

   function progressBarController($scope) {
      log("Controller: vsl.velocity.ui.progressBar");

      $scope.getSegments = function(){
         return new Array($scope.settings.segments-1);
      };

      $scope.getSegmentWidth = function(index){
         var segmentWidth = ($scope.settings.width/$scope.settings.segments);
         return {width:segmentWidth*(index+1)+"px"};
      };

      return;
   }

   module.service("progressBarService",progressBarService);

   progressBarService.$inject=['$q', 'temporaryStorage'];

   function progressBarService($q, temporaryStorage){
      log("Service: vsl.velocity.ui.progressBar");

      return;
   }

   module.directive("progressBar",progressBar);

   progressBar.$inject=['$timeout'];

   function progressBar($timeout) {
      log("Directive: vsl.velocity.ui.progressBar");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("progressBar.html"),
         controller: progressBarController,
         scope: { settings: "=settings" },
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.progressBar");

         $timeout(function(){
            if ($scope.settings.width) {
               angular.element(element.parent()).css({width: $scope.settings.width+"px"});
            }
            if ($scope.settings.percentage) {
               $scope.settings.text=$scope.settings.percentage;
               $scope.settings.size=$scope.settings.width*($scope.settings.percentage/100);
               angular.element( element[0].querySelector("."+css.expand("-progress"))).css({width:$scope.settings.size+"px"});
            } else {
               if ($scope.settings.value) {
                  var percentage=($scope.settings.value.at/$scope.settings.value.max);
                  $scope.settings.text=$scope.settings.value.at;
                  $scope.settings.size=$scope.settings.width*percentage;
                  angular.element(element[0].querySelector("."+css.expand("-progress"))).css({width:$scope.settings.size+"px"});
               }
            }
            if ($scope.settings.size<=20){
               angular.element(element[0].querySelector("."+css.expand("-text"))).addClass(css.expand("-right"))
            }
         },0);

         return;
      }

   }

});
