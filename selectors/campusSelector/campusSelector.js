encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }
   function warn() {
      //console.warn.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.selectors.campusSelector",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.selectors.campusSelector",[
      $localPath.combineUrls("../selectors.css"),
      $localPath.combineUrls("../../../resources/images/icons.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.selectors.campusSelector",[
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.filters",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.ui.selectors.campusSelector");
   });

   module.controller("campusSelectorController",campusSelectorController);

   campusSelectorController.$inject=["$scope", "$location", "currentSelections"];

   function campusSelectorController($scope, $location, currentSelections) {
      log("Controller: vsl.velocity.ui.selectors.campusSelector");

      currentSelections.setSelectedCampusRequired(true);

      $scope.$watch(currentSelections.getCampusList,function(nv){
         if (nv) {
            if (nv.length==0) {
               if (currentSelections.userIsTeacher())
                  $location.path("/teacher/classes");
            }
            $scope.campusList = nv;
            $scope.campusListLength = currentSelections.getCampusListLength();
            warn("\tcampusList (length): ",$scope.campusListLength);
         }
      });

      $scope.$watch(currentSelections.getSelectedCampus,function(nv){
         if (nv!=undefined) {
            $scope.campusSelected = nv;
            warn("\tcampusSelected: ",nv.name);
         }
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:disableDropdowns",function(){
         $scope.campusSelectorEnabled = false;
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:enableDropdowns",function(){
         $scope.campusSelectorEnabled = true;
      });

      $scope.changeSelectedCampus = function(selectedCampusUuid){
         currentSelections.setSelectedCampus(selectedCampusUuid);
      };

      $scope.campusNameClicked = function(){
         if ($scope.showCampusAsBreadcrumb) {
            log("\tFUNC --> campusNameClicked()");
            log("\tEVENT --> vsl.velocity.ui.selectors.campusSelector:breadcrumbClicked");
            $scope.$root.$broadcast("vsl.velocity.ui.selectors.campusSelector:breadcrumbClicked");
         }
      };

      return;
   }

   module.directive("campusSelector",campusSelector);

   campusSelector.$inject=["$filter"];

   function campusSelector($filter) {
      log("Directive: vsl.velocity.ui.selectors.campusSelector");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("campusSelector.html"),
         controller: campusSelectorController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.selectors.campusSelector");

         $scope.showCampusSelector=$filter("getAttributeSetting")(attributes,"showCampusSelector");
         $scope.showAllCampuses = $filter("getAttributeSetting")(attributes,"showAllCampuses");
         $scope.showCampusAsBreadcrumb = $filter("getAttributeSetting")(attributes,"showCampusAsBreadcrumb");
         $scope.hideCampusDropDown = $filter("getAttributeSetting")(attributes,"hideCampusDropDown");

         angular.element(css.expand(".-dropdown-menu")).on("click","LI DIV",changeSelectedCampus);
         function changeSelectedCampus(){
            $scope.changeSelectedCampus.apply(null,arguments);
         }
         $scope.$on("$destroy",function(){
            angular.element(css.expand(".-dropdown-menu")).off("click","LI DIV",changeSelectedCampus);
         });

         return;
      }

   }

});
