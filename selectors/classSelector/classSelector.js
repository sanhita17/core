encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }
   function warn() {
      //console.warn.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.selectors.classSelector",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.selectors.classSelector",[
      $localPath.combineUrls("../selectors.css"),
      $localPath.combineUrls("../../../resources/images/icons.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.selectors.classSelector",[
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.filters",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.ui.selectors.classSelector");
   });

   module.controller("classSelectorController",classSelectorController);

   classSelectorController.$inject=["$scope", "$location", "currentSelections"];

   function classSelectorController($scope, $location, currentSelections) {
      log("Controller: vsl.velocity.ui.selectors.classSelector");

      currentSelections.setSelectedSchoolClassRequired(true);

      $scope.$watch(currentSelections.getSchoolClassList,function(nv){
         if (nv) {
            if (nv.length==0) {
               if (currentSelections.userIsTeacher())
                  $location.path("/teacher/classes");
            }
            $scope.schoolClassList = nv;
            $scope.schoolClassListLength = currentSelections.getSchoolClassListLength();
            warn("\tschoolClassList (length): ",$scope.schoolClassListLength);
         }
      });

      $scope.$watch(currentSelections.getSelectedSchoolClass,function(nv){
         if (nv!=undefined) {
            $scope.schoolClassSelected = nv;
            warn("\tselectedSchoolClass: ",nv.name);
         }
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:disableDropdowns",function(){
         $scope.schoolClassSelectorEnabled = false;
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:enableDropdowns",function(){
         $scope.schoolClassSelectorEnabled = true;
      });

      $scope.changeSelectedSchoolClass = function(selectedSchoolClassUuid){
         currentSelections.setSelectedSchoolClass(selectedSchoolClassUuid);
      };

      $scope.classNameClicked = function(){
         if ($scope.showClassAsBreadcrumb) {
            log("\tFUNC --> classNameClicked()");
            log("\tEVENT --> vsl.velocity.ui.selectors.classSelector:breadcrumbClicked");
            $scope.$root.$broadcast("vsl.velocity.ui.selectors.classSelector:breadcrumbClicked");
         }
      };

      return;
   }

   module.directive("classSelector",classSelector);

   classSelector.$inject=["$filter"];

   function classSelector($filter) {
      log("Directive: vsl.velocity.ui.selectors.classSelector");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("classSelector.html"),
         controller: classSelectorController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.selectors.classSelector");

         $scope.showClassSelector=$filter("getAttributeSetting")(attributes,"showClassSelector");
         $scope.showAllClasses = $filter("getAttributeSetting")(attributes,"showAllClasses");
         $scope.showClassAsBreadcrumb = $filter("getAttributeSetting")(attributes,"showClassAsBreadcrumb");
         $scope.hideClassDropDown = $filter("getAttributeSetting")(attributes,"hideClassDropDown");

         angular.element(css.expand(".-dropdown-menu")).on("click","LI DIV",changeSelectedSchoolClass);
         function changeSelectedSchoolClass(){
            $scope.changeSelectedSchoolClass.apply(null,arguments);
         }
         $scope.$on("$destroy",function(){
            angular.element(css.expand(".-dropdown-menu")).off("click","LI DIV",changeSelectedSchoolClass);
         });

         return;
      }

   }

});
