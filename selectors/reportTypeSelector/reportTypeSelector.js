encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }
   function warn() {
      //console.warn.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.selectors.reportTypeSelector",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.selectors.reportTypeSelector",[
      $localPath.combineUrls("../selectors.css"),
      $localPath.combineUrls("../../../resources/images/icons.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.selectors.reportTypeSelector",[
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.filters",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.ui.selectors.reportTypeSelector");
   });

   module.controller("strandSelectorController",strandSelectorController);

   strandSelectorController.$inject=["$scope", "currentSelections"];

   function strandSelectorController($scope, currentSelections) {
      log("Controller: vsl.velocity.ui.selectors.reportTypeSelector");

      currentSelections.setSelectedReportTypeRequired(true);

      $scope.$watch(currentSelections.getReportTypeList,function(nv){
         if (nv!=undefined) {
            $scope.reportTypeList = nv;
            warn("\treportTypeList (length): ",nv.length);
         }
      });

      $scope.$watch(currentSelections.getSelectedReportType,function(nv){
         if (nv!=undefined) {
            $scope.reportTypeSelected = nv;
            warn("\treportTypeSelected: ",nv.name);
         }
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:disableDropdowns",function(){
         $scope.reportTypeSelectorEnabled = false;
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:enableDropdowns",function(){
         $scope.reportTypeSelectorEnabled = true;
      });

      $scope.changeSelectedReportType = function(selectedReportTypeName){
         currentSelections.setSelectedReportType(selectedReportTypeName);
      };

      $scope.reportTypeNameClicked = function(){
         if ($scope.showReportTypeAsBreadcrumb) {
            log("\tFUNC --> reportTypeNameClicked()");
            log("\tEVENT --> vsl.velocity.ui.selectors.reportTypeSelector:breadcrumbClicked");
            $scope.$root.$broadcast("vsl.velocity.ui.selectors.reportTypeSelector:breadcrumbClicked");
         }
      };

      return;
   }

   module.directive("reportTypeSelector",reportTypeSelector);

   reportTypeSelector.$inject=["$filter"];

   function reportTypeSelector($filter) {
      log("Directive: vsl.velocity.ui.selectors.reportTypeSelector");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("reportTypeSelector.html"),
         controller: strandSelectorController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.selectors.reportTypeSelector");

         $scope.showReportTypeAsBreadcrumb = $filter("getAttributeSetting")(attributes,"showReportTypeAsBreadcrumb");
         $scope.hideReportTypeDropDown = $filter("getAttributeSetting")(attributes,"hideReportTypeDropDown");

         angular.element(css.expand(".-dropdown-menu")).on("click","LI DIV",changeSelectedReportType);
         function changeSelectedReportType(){
            $scope.changeSelectedReportType.apply(null,arguments);
         }
         $scope.$on("$destroy",function(){
            angular.element(css.expand(".-dropdown-menu")).off("click","LI DIV",changeSelectedReportType);
         });

         return;
      }

   }


});
