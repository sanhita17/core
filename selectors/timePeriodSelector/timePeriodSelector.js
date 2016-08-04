encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }
   function warn() {
      //console.warn.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.selectors.timePeriodSelector",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.selectors.timePeriodSelector",[
      $localPath.combineUrls("../../../resources/fonts/fonts.css"),
      $localPath.combineUrls("../../../resources/images/icons.css"),
      $localPath.combineUrls("timePeriodSelector.css"),
      $localPath.combineUrls("../../../resources/styles/datepicker.css")
   ],transitionTime);

   var module=angular.module("vsl.velocity.ui.selectors.timePeriodSelector",[
      "angular.css",
      "ui.bootstrap",
      "vsl.velocity.app.directives",
      "vsl.velocity.app.filters",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.ui.selectors.timePeriodSelector");
   });

   module.controller("timePeriodSelectorController",timePeriodSelectorController);

   timePeriodSelectorController.$inject=["$scope", "$timeout", "$filter", "currentSelections"];

   function timePeriodSelectorController($scope, $timeout, $filter, currentSelections) {
      log("Controller: vsl.velocity.ui.selectors.timePeriodSelector");

      currentSelections.setSelectedTimePeriodRequired(true);

      $scope.$watch(currentSelections.getTimePeriodList,function(nv){
         if (nv!=undefined) {
            $scope.timePeriodList = nv;
            warn("\ttimePeriodList (length): ",nv.length);
         }
      });

      $scope.$watch(currentSelections.getSelectedTimePeriod,function(nv){
         if (nv!=undefined) {
            $scope.timePeriodSelected = nv;
            warn("\ttimePeriodSelected: ",nv.display || nv.name);
         }
      });

      $scope.$on("vsl.velocity.ui.selectors.timePeriodSelector:disable",function(){
         log("\tEVENT --> vsl.velocity.ui.selectors.timePeriodSelector:disable");
         $scope.timePeriodSelectorEnabled = false;
      });

      $scope.$on("vsl.velocity.ui.selectors.timePeriodSelector:enable",function(){
         log("\tEVENT --> vsl.velocity.ui.selectors.timePeriodSelector:enable");
         $scope.timePeriodSelectorEnabled = true;
      });

      $scope.changeSelectedTimePeriod = function(selectedTimePeriodValue){
         if (selectedTimePeriodValue=="CUSTOM") {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            $scope.selectCustomTimePeriod= !$scope.selectCustomTimePeriod;
            $(css.expand(".-dropdown-menu LI:first-of-type")).addClass("active");
            $(css.expand(".-calendar-menu")).removeClass("hide");
            $scope.setupDateRangeSelector();
         } else {
            currentSelections.setSelectedTimePeriod(selectedTimePeriodValue);
         }
      };

      $scope.timePeriodNameClicked = function(){
         if ($scope.showTimePeriodAsBreadcrumb) {
            log("\tFUNC --> timePeriodNameClicked()");
            log("\tEVENT --> vsl.velocity.ui.selectors.timePeriodSelector:breadcrumbClicked");
            $scope.$emit("vsl.velocity.ui.selectors.timePeriodSelector:breadcrumbClicked");
         }
      };

      $scope.setupDateRangeSelector = function(){
         log("\tFUNC --> setupDateRangeSelector()");
         angular.element("#fromDate").datepicker({
            minDate: new Date($scope.twoYearsAgo),
            maxDate: new Date($scope.today),
            onSelect: function() {
               validateDates();
            }
         }).datepicker("setDate", $scope.timePeriodSelected ? new Date($scope.timePeriodSelected.startDate) : new Date($scope.today));
         angular.element("#toDate").datepicker({
            minDate: new Date($scope.twoYearsAgo),
            maxDate: new Date($scope.today),
            onSelect: function() {
               validateDates();
            }
         }).datepicker("setDate", $scope.timePeriodSelected ? new Date($scope.timePeriodSelected.endDate) : new Date($scope.today));
      };

      function validateDates() {
         var fromDate = $('#fromDate').datepicker("getDate").toISOString();
         var toDate = $('#toDate').datepicker("getDate").toISOString();
         fromDate <= toDate ? $scope.updateRangeDisabled = false : $scope.updateRangeDisabled = true;
         $scope.$apply();
      }

      $scope.updateDateRangeSelection = function(){
         log("\tFUNC --> updateDateRangeSelection()");
         $scope.customTimePeriodOption = {
            startDate: null,
            endDate: null
         };
         $scope.customTimePeriodOption.startDate = new Date(new Date($('#fromDate').datepicker("getDate")).setHours(0,0,0,0));
         $scope.customTimePeriodOption.endDate = new Date(new Date($('#toDate').datepicker("getDate")).setHours(23,59,59,999));
         log("\t\tcustomTimePeriodOption.startDate: ",$scope.customTimePeriodOption.startDate);
         log("\t\tcustomTimePeriodOption.endDate: ",$scope.customTimePeriodOption.endDate);
         var keepChecking=true;
         angular.forEach($scope.timePeriodList,function(timePeriod){
            if (keepChecking) {
               if (timePeriod.value!=$scope.timePeriodSelected.value) {
                  if (timePeriod.value!="CUSTOM") {
                     if (($scope.customTimePeriodOption.startDate.toString()==timePeriod.startDate.toString()) &&
                        ($scope.customTimePeriodOption.endDate.toString()==timePeriod.endDate.toString())) {
                        $scope.timePeriodSelected=timePeriod;
                        keepChecking = false;
                     }
                  }
               }
            }
         });
         if (keepChecking) {
            $scope.timePeriodList[0].startDate = $scope.customTimePeriodOption.startDate;
            $scope.timePeriodList[0].endDate = new Date($scope.customTimePeriodOption.endDate);
            $scope.timePeriodList[0].display = $filter("getDisplayTextForDateRange")($scope.timePeriodList[0].startDate,$scope.timePeriodList[0].endDate);
            $scope.timePeriodSelected = $scope.timePeriodList[0];
         }
         log("\t\ttimePeriodSelected: ",$scope.timePeriodSelected);
         currentSelections.setSelectedTimePeriod($scope.timePeriodSelected);
         $timeout(function(){
            $scope.element.click();
         },0);
         $(css.expand(".-dropdown-menu LI:first-of-type")).removeClass("active");
         $(css.expand(".-calendar-menu")).addClass("hide");
         $scope.selectCustomTimePeriod = false;
      };

      $scope.clickOutside = function(){
         if ($scope.selectCustomTimePeriod) {
            log("\tFUNC --> clickOutside()");
            $(css.expand(".-dropdown-menu LI:first-of-type")).removeClass("active");
            $(css.expand(".-calendar-menu")).addClass("hide");
            $scope.selectCustomTimePeriod=false;
         }
      };

      return;
   }

   module.directive("timePeriodSelector",timePeriodSelector);

   timePeriodSelector.$inject=["$filter"];

   function timePeriodSelector($filter) {
      log("Directive: vsl.velocity.ui.selectors.timePeriodSelector");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("timePeriodSelector.html"),
         controller: timePeriodSelectorController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.selectors.timePeriodSelector");

         $scope.element = element;
         $scope.showCustomTimePeriodOption = $filter("getAttributeSetting")(attributes,"showCustomTimePeriodOption");
         $scope.showTimePeriodAsBreadcrumb = $filter("getAttributeSetting")(attributes,"showTimePeriodAsBreadcrumb");
         $scope.hideTimePeriodDropDown = $filter("getAttributeSetting")(attributes,"hideTimePeriodDropDown");

         angular.element(css.expand(".-dropdown-menu")).on("click","LI DIV",changeSelectedTimePeriod);
         function changeSelectedTimePeriod(){
            $scope.changeSelectedTimePeriod.apply(null,arguments);
            $(css.expand(css.expand(".-dropdown-menu LI:first-of-type"))).removeClass("active");
            $(css.expand(css.expand(".-calendar-menu"))).addClass("hide");
         }
         $scope.$on("$destroy",function(){
            angular.element(css.expand(".-dropdown-menu")).off("click","LI DIV",changeSelectedTimePeriod);
         });

         return;
      }

   }

});
