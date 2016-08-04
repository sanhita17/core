encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.nonStudent.subNavbar",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.nonStudent.subNavbar",[
      $localPath.combineUrls("subNavbar.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.ui.nonStudent.subNavbar",[
      "ngAnimate",
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.filters",
      "vsl.velocity.app.services",
      "vsl.velocity.app.service.currentSelections",
      "vsl.velocity.app.service.principalProperties",
      "vsl.velocity.ui.selectors.districtSelector",
      "vsl.velocity.ui.selectors.campusSelector",
      "vsl.velocity.ui.selectors.classSelector",
      "vsl.velocity.ui.selectors.studentSelector",
      "vsl.velocity.ui.selectors.strandSelector",
      "vsl.velocity.ui.selectors.reportTypeSelector"
   ]).run(function() {
      log("Module: vsl.velocity.ui.nonStudent.subNavbar");
   });

   module.controller("subNavbarController",subNavbarController);

   subNavbarController.$inject=[];

   function subNavbarController() {
      log("Controller: vsl.velocity.ui.nonStudent.subNavbar");

   }

   module.directive("subNavbar",subNavbar);

   subNavbar.$inject=["$filter", "$timeout", "$q", "$location", "temporaryStorage"];

   function subNavbar($filter, $timeout) {
      log("Directive: vsl.velocity.ui.nonStudent.subNavbar");

      return {
         restrict: "E",
         replace: false,
         templateUrl: $localPath.combineUrls("subNavbar.html"),
         controller: subNavbarController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.nonStudent.subNavbar");

         $timeout(function(){
            $scope.showDistrictSelector=$filter("getAttributeSetting")(attributes,"showDistrictSelector");
            $scope.showAllDistricts = $filter("getAttributeSetting")(attributes,"showAllDistricts");
            $scope.showDistrictAsBreadcrumb=$filter("getAttributeSetting")(attributes,"showDistrictAsBreadcrumb");
            $scope.hideDistrictDropDown=$filter("getAttributeSetting")(attributes,"hideDistrictDropDown");

            $scope.showCampusSelector=$filter("getAttributeSetting")(attributes,"showCampusSelector");
            $scope.showAllCampuses = $filter("getAttributeSetting")(attributes,"showAllCampuses");
            $scope.showCampusAsBreadcrumb=$filter("getAttributeSetting")(attributes,"showCampusAsBreadcrumb");
            $scope.hideCampusDropDown=$filter("getAttributeSetting")(attributes,"hideCampusDropDown");

            $scope.showClassSelector=$filter("getAttributeSetting")(attributes,"showClassSelector");
            $scope.showAllClasses = $filter("getAttributeSetting")(attributes,"showAllClasses");
            $scope.showClassAsBreadcrumb=$filter("getAttributeSetting")(attributes,"showClassAsBreadcrumb");
            $scope.hideClassDropDown=$filter("getAttributeSetting")(attributes,"hideClassDropDown");

            $scope.showStudentSelector=$filter("getAttributeSetting")(attributes,"showStudentSelector");
            $scope.showAllStudents=$filter("getAttributeSetting")(attributes,"showAllStudents");
            $scope.showStudentAsBreadcrumb=$filter("getAttributeSetting")(attributes,"showStudentAsBreadcrumb");
            $scope.hideStudentDropDown=$filter("getAttributeSetting")(attributes,"hideStudentDropDown");

            $scope.showStrandSelector=$filter("getAttributeSetting")(attributes,"showStrandSelector");
            $scope.showAllStrands=$filter("getAttributeSetting")(attributes,"showAllStrands");
            $scope.showStrandAsBreadcrumb=$filter("getAttributeSetting")(attributes,"showStrandAsBreadcrumb");
            $scope.hideStrandDropDown=$filter("getAttributeSetting")(attributes,"hideStrandDropDown");

            $scope.showReportTypeSelector=$filter("getAttributeSetting")(attributes,"showReportTypeSelector");
            $scope.showReportTypeAsBreadcrumb=$filter("getAttributeSetting")(attributes,"showReportTypeAsBreadcrumb");
            $scope.hideReportTypeDropDown=$filter("getAttributeSetting")(attributes,"hideReportTypeDropDown");
         },0);

         return;
      }

   }

});
