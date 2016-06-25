encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.toggles.assignmentToggle",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.toggles.assignmentToggle",[
      $localPath.combineUrls("assignmentToggle.css"),
      $localPath.combineUrls("../../../resources/images/icons.css"),
      $localPath.combineUrls("../../../resources/fonts/fonts.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.toggles.assignmentToggle",[
      "angular.css"
   ]).run(function() {
      log("Module: vsl.velocity.ui.toggles.assignmentToggle");
   });

   module.controller("assignmentToggleController",assignmentToggleController);

   assignmentToggleController.$inject=['$scope'];

   function assignmentToggleController($scope) {
      log("Controller: vsl.velocity.ui.toggles.assignmentToggle");

      $scope.toggleState = function(){
         log("\tFUNC --> toggleState()");
         if ($scope.element.hasClass(css.expand("-disabled"))){
            log("\t--> prevent double-click");
            return;
         }
         var toggleToState = "";
         switch ($scope.student[$scope.property].toLowerCase()) {
            case "assigned":     toggleToState = "unassigned";  break;
            case "unassigned":   toggleToState = "assigned";    break;
            case "inprogress":   return;
         }
         $scope.element.addClass(css.expand("-disabled"));
         $scope.$emit("vsl.velocity.ui.toggles.assignmentToggle:toggleState",{state: toggleToState, index: $scope.index, property: $scope.property});
      };

      $scope.$on("vsl.velocity.views.teacher.classRoster.assignmentToggled",function(event, arguments){
         $scope.handleUpdatingState(arguments.state, arguments.index);
      });

      $scope.handleUpdatingState = function(state, index){
         log("\tFUNC --> handleUpdatingState()",state,index);
         if (index==$scope.index) {
            $scope.element.removeClass(css.expand("-disabled"));
            $scope.text = $scope.getDisplaytext(state);
         }
      };

      $scope.getDisplaytext = function(state){
         log("\tFUNC --> getDisplaytext()",state);
         return (state!=undefined ? $scope.states[state.toLowerCase()].text : "");
      };

      $scope.$watch("student[property]",function(nv, ov){
         if (nv) {
            if (ov!=undefined && nv!=ov)
            log("\t\tChanged: ",ov,"-->",nv);
         }
      });
   }

   module.directive("assignmentToggle",assignmentToggle);

   assignmentToggle.$inject=['$timeout'];

   function assignmentToggle($timeout) {
      log("Directive: vsl.velocity.ui.toggles.assignmentToggle");

      return {
         restrict: "E",
         transclude: true,
         templateUrl: $localPath.combineUrls("assignmentToggle.html"),
         controller: assignmentToggleController,
         link: link,
         scope: {
            student: "=?student",
            index: "=?index"
         },
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.toggles.assignmentToggle");

         $scope.element = $(element);
         log("\t\telement: ",$scope.element);
         $scope.states={
            "assigned" : { text: "assigned"},
            "unassigned" : { text: "unassigned"},
            "inprogress" : { text: "in progress"}
         };
         $scope.property=element.attr("property");

         $scope.text = $scope.getDisplaytext($scope.student[$scope.property]);

         log("\t\tstudent: ",$scope.student);
         log("\t\tindex: ",$scope.index);
         log("\t\tproperty: ",$scope.property," = ",$scope.student[$scope.property]);
         log("\t\ttext: ",$scope.text);

         $timeout(function(){
            $scope.uiReady = true;
         },0);

         return;
      }

   }

});
