encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }
   function warn() {
      //console.warn.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.selectors.strandSelector",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.selectors.strandSelector",[
      $localPath.combineUrls("../selectors.css"),
      $localPath.combineUrls("../../../resources/images/icons.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.selectors.strandSelector",[
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.filters",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.ui.selectors.strandSelector");
   });

   module.controller("strandSelectorController",strandSelectorController);

   strandSelectorController.$inject=["$scope", "currentSelections"];

   function strandSelectorController($scope, currentSelections) {
      log("Controller: vsl.velocity.ui.selectors.strandSelector");

      currentSelections.setSelectedStrandRequired(true);

      $scope.$watch(currentSelections.getStrandList,function(nv){
         if (nv!=undefined) {
            $scope.strandList = nv;
            $scope.strandListLength = currentSelections.getStrandListLength();
            warn("\tstrandList (length): ",$scope.strandListLength);
         }
      });

      $scope.$watch(currentSelections.getSelectedStrand,function(nv){
         if (nv!=undefined) {
            $scope.strandSelected = nv;
            warn("\tstrandSelected: ",nv.name);
         }
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:disableDropdowns",function(){
         $scope.strandSelectorEnabled = false;
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:enableDropdowns",function(){
         $scope.strandSelectorEnabled = true;
      });

      $scope.changeSelectedStrand = function(selectedStrandName){
         currentSelections.setSelectedStrand(selectedStrandName);
      };

      $scope.strandNameClicked = function(){
         if ($scope.showStrandAsBreadcrumb) {
            log("\tFUNC --> strandNameClicked()");
            log("\tEVENT --> vsl.velocity.ui.selectors.strandSelector:breadcrumbClicked");
            $scope.$root.$broadcast("vsl.velocity.ui.selectors.strandSelector:breadcrumbClicked");
         }
      };

      return;
   }

   module.directive("strandSelector",strandSelector);

   strandSelector.$inject=["$filter"];

   function strandSelector($filter) {
      log("Directive: vsl.velocity.ui.selectors.strandSelector");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("strandSelector.html"),
         controller: strandSelectorController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.selectors.strandSelector");

         $scope.allStrands = {
            name: "All Strands"
         };

         $scope.showAllStrands = $filter("getAttributeSetting")(attributes,"showAllStrands");
         $scope.showStrandAsBreadcrumb = $filter("getAttributeSetting")(attributes,"showStrandAsBreadcrumb");
         $scope.hideStrandDropDown = $filter("getAttributeSetting")(attributes,"hideStrandDropDown");

         angular.element(css.expand(".-dropdown-menu")).on("click","LI DIV",changeSelectedStrand);
         function changeSelectedStrand(){
            $scope.changeSelectedStrand.apply(null,arguments);
         }
         $scope.$on("$destroy",function(){
            angular.element(css.expand(".-dropdown-menu")).off("click","LI DIV",changeSelectedStrand);
         });

         return;
      }

   }

});
