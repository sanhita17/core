
Conversation opened. 1 unread message.

Skip to content
Using Gmail with screen readers
Search



Gmail
COMPOSE
Labels
Inbox (5)
Starred
Sent Mail
Drafts (2)
More 
Hangouts

 
 
 
  More 
1 of 64  
 
Print all In new window
(no subject) 
Inbox
x 

sanhita sriram <sanhita6931@gmail.com>
Attachments5:05 PM (2 minutes ago)

to me 
3 Attachments 
 
	
Click here to Reply or Forward
0.04 GB (0%) of 15 GB used
Manage
Terms - Privacy
Last account activity: 0 minutes ago
Currently being used in 1 other location  Details


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
