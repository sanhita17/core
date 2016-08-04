encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }
   function warn() {
      //console.warn.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.selectors.studentSelector",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.selectors.studentSelector",[
      $localPath.combineUrls("../selectors.css"),
      $localPath.combineUrls("studentSelector.css"),
      $localPath.combineUrls("../../../resources/images/icons.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.selectors.studentSelector",[
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.filters",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.ui.selectors.studentSelector");
   });

   module.controller("studentSelectorController",studentSelectorController);

   studentSelectorController.$inject=["$scope", "currentSelections"];

   function studentSelectorController($scope, currentSelections) {
      log("Controller: vsl.velocity.ui.selectors.studentSelector");

      currentSelections.setSelectedStudentRequired(true);

      $scope.$watch(currentSelections.getStudentList,function(nv){
         if (nv) {
            $scope.studentList = nv;
            $scope.studentListLength = currentSelections.getStudentListLength();
            warn("\tstudentList (length): ",$scope.studentListLength);
         }
      });

      $scope.$watch(currentSelections.getSelectedStudent,function(nv){
         if (nv!=undefined) {
            $scope.studentSelected = nv;
            warn("\tselectedStudent: ",nv.firstName+" "+nv.lastName);
         }
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:disableDropdowns",function(){
         $scope.studentSelectorEnabled = false;
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:enableDropdowns",function(){
         $scope.studentSelectorEnabled = true;
      });

      $scope.changeSelectedStudent = function(selectedStudentUuid){
         currentSelections.setSelectedStudent(selectedStudentUuid);
      };

      $scope.studentNameClicked = function(){
         if ($scope.showStudentAsBreadcrumb) {
            log("\tFUNC --> studentNameClicked()");
            log("\tEVENT --> vsl.velocity.ui.selectors.studentSelector:breadcrumbClicked");
            $scope.$root.$broadcast("vsl.velocity.ui.selectors.studentSelector:breadcrumbClicked");
         }
      };

      return;
   }

   module.directive("studentSelector",studentSelector);

   studentSelector.$inject=["$filter"];

   function studentSelector($filter) {
      log("Directive: vsl.velocity.ui.selectors.studentSelector");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("studentSelector.html"),
         controller: studentSelectorController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.selectors.studentSelector");

         $scope.showAllStudents = $filter("getAttributeSetting")(attributes,"showAllStudents");
         $scope.showStudentAsBreadcrumb = $filter("getAttributeSetting")(attributes,"showStudentAsBreadcrumb");
         $scope.hideStudentDropDown = $filter("getAttributeSetting")(attributes,"hideStudentDropDown");

         angular.element(css.expand(".-dropdown-menu")).on("click","LI DIV",changeSelectedStudent);
         function changeSelectedStudent(){
            $scope.changeSelectedStudent.apply(null,arguments);
         }
         $scope.$on("$destroy",function(){
            angular.element(css.expand(".-dropdown-menu")).off("click","LI DIV",changeSelectedStudent);
         });

         return;
      }

   }

});
