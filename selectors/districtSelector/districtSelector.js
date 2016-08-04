encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }
   function warn() {
      //console.warn.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.selectors.districtSelector",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.selectors.districtSelector",[
      $localPath.combineUrls("../selectors.css"),
      $localPath.combineUrls("../../../resources/images/icons.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.selectors.districtSelector",[
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.filters",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.ui.selectors.districtSelector");
   });

   module.controller("districtSelectorController",districtSelectorController);

   districtSelectorController.$inject=["$scope", "$location", "currentSelections"];

   function districtSelectorController($scope, $location, currentSelections) {
      log("Controller: vsl.velocity.ui.selectors.districtSelector");

      currentSelections.setSelectedDistrictRequired(true);

      $scope.$watch(currentSelections.getDistrictList,function(nv){
         if (nv) {
            if (nv.length==0) {
               if (currentSelections.userIsTeacher())
                  $location.path("/teacher/classes");
            }
            $scope.districtList = nv;
            $scope.districtListLength = currentSelections.getDistrictListLength();
            warn("\tdistrictList (length): ",$scope.districtListLength);
         }
      });

      $scope.$watch(currentSelections.getSelectedDistrict,function(nv){
         if (nv!=undefined) {
            $scope.districtSelected = nv;
            warn("\tdistrictSelected: ",nv.name);
         }
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:disableDropdowns",function(){
         $scope.districtSelectorEnabled = false;
      });

      $scope.$on("vsl.velocity.ui.nonStudent.subNavbar:enableDropdowns",function(){
         $scope.districtSelectorEnabled = true;
      });

      $scope.changeSelectedDistrict = function(selectedDistrictUuid){
         currentSelections.setSelectedDistrict(selectedDistrictUuid);
      };

      $scope.districtNameClicked = function(){
         if ($scope.showDistrictAsBreadcrumb) {
            log("\tFUNC --> districtNameClicked()");
            log("\tEVENT --> vsl.velocity.ui.selectors.districtSelector:breadcrumbClicked");
            $scope.$root.$broadcast("vsl.velocity.ui.selectors.districtSelector:breadcrumbClicked");
         }
      };

      return;
   }

   module.directive("districtSelector",districtSelector);

   districtSelector.$inject=["$filter"];

   function districtSelector($filter) {
      log("Directive: vsl.velocity.ui.selectors.districtSelector");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("districtSelector.html"),
         controller: districtSelectorController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.selectors.districtSelector");

         $scope.showDistrictSelector=$filter("getAttributeSetting")(attributes,"showDistrictSelector");
         $scope.showAllDistricts = $filter("getAttributeSetting")(attributes,"showAllDistricts");
         $scope.showDistrictAsBreadcrumb = $filter("getAttributeSetting")(attributes,"showDistrictAsBreadcrumb");
         $scope.hideDistrictDropDown = $filter("getAttributeSetting")(attributes,"hideDistrictDropDown");

         angular.element(css.expand(".-dropdown-menu")).on("click","LI DIV",changeSelectedDistrict);
         function changeSelectedDistrict(){
            $scope.changeSelectedDistrict.apply(null,arguments);
         }
         $scope.$on("$destroy",function(){
            angular.element(css.expand(".-dropdown-menu")).off("click","LI DIV",changeSelectedDistrict);
         });

         return;
      }

   }

});
