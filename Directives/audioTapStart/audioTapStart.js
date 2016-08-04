encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.audioTapStart",$localPath);

   var transitionTime = 1;

   var module=angular.module("vsl.velocity.ui.audioTapStart",[
      "angular.css"
   ]).run(function() {
      log("Module: vsl.velocity.ui.audioTapStart");
   });

   module.directive("audioTapStart",audioTapStart);

   audioTapStart.$inject=["$compile"];

   function audioTapStart($compile) {
      log("Directive: vsl.velocity.ui.audioTapStart");

      return {
         restrict: "A",
         scope: true,
         link: link
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.audioTapStart");

         $scope.$on("vsl.core.ui.audioPlayer:failedPlay",function(event,defer){
            var modal=$compile(angular.element("<audio-tap-modal></audio-tap-modal>"))($scope);
            element.append(modal);
            $scope.tapped = defer.resolve;
            defer.then(closeit,closeit);
            function closeit(){
               modal.remove();
            }
         });

      }

   }

   var css=angular.css("vsl.velocity.ui.audioTapModal",[
      $localPath.combineUrls("audioTapModal.css")
   ], transitionTime);

   module.directive("audioTapModal",audioTapModal);

   audioTapModal.$inject=[];

   function audioTapModal() {
      log("Directive: vsl.velocity.ui.audioTapModal");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("audioTapModal.html"),
         css: css
      };

   }


});
