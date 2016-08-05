encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }

   log("Script: vsl.core.ui.nextButton   ",$localPath);
   
   var transitionTime = 1;

   var css=angular.css("vsl.core.ui.nextButton",$localPath.combineUrls("nextButton.css"), transitionTime);

   angular.module("vsl.core.ui.nextButton",[
      "ngAnimate",
      "angular.css"
   ]).run(function() {
      log("Module: vsl.core.ui.nextButton");
   });

   angular
         .module("vsl.core.ui.nextButton")
         .directive("nextButton",nextButton);

   nextButton.$inject=["$interval"];
   function nextButton($interval) {
      log("Directive: nextButton");
      return {
         restrict: 'E',
         replace: true,
         template: '<button></button>',
         controller: function($scope) {
            $scope.disableTest = true;
         },
         link:link,
         css:css
      };
      function link($scope,element,attributes) {
         log("Instance: nextButton");
         if (element.hasClass(css.expand("-version2"))){
            element.addClass(css.expand("-startup"));
            setTimeout(function(){element.removeClass(css.expand("-startup"))},1000);
         }
         element.on("click",function(event) {
            if (element.hasClass(css.expand("-version2")) && element.hasClass("ng-hide-add")) {
               event.preventDefault();
               event.stopImmediatePropagation();
               event.stopPropagation();
            }
         });
         return;
      }
   };
});
nextButton.js
Open with
3 of 3 items
test.htmlnextButton.cssnextButton.jsDisplaying nextButton.js.
