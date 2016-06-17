
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
1 of 61  
 
Print all In new window
(no subject) 
Inbox
x 

sanhita sriram <sanhita6931@gmail.com>
Attachments2:27 PM (2 hours ago)

to me 
4 Attachments 
 
	
Click here to Reply or Forward
0.04 GB (0%) of 15 GB used
Manage
Terms - Privacy
Last account activity: 57 minutes ago
Details

encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console, arguments);
   }

   log("Script: vsl.velocity.ui.datePicker", $localPath);

   var transitionTime = 1;
   var mindate;

   var css = angular.css("vsl.velocity.ui.datePicker", [
      $localPath.combineUrls("datePicker.css")
   ], transitionTime);

   var module = angular.module("vsl.velocity.ui.datePicker", []).run(function() {
      log("Module: vsl.velocity.ui.datePicker");
   });

   module.controller("datePickerController", datePickerController);

   datePickerController.$inject = ['$scope', '$interval', '$timeout', '$filter'];

   function datePickerController($scope, $interval, $timeout, $filter) {
      log("Controller: vsl.velocity.ui.datePicker");

      var fromDats, toDate, isoDate;
      $scope.updateRangeDisabled = true;


      var minDate = $scope.minDate ? new Date($scope.minDate) : null;
      var maxDate = $scope.maxDate ? new Date($scope.maxDate) : null;


      $timeout(function() {
         angular.element("#fromDate").datepicker({
            minDate: minDate,
            maxDate: maxDate,
            onSelect: function() {
               validateDates();
            }
         }).datepicker("setDate", $scope.setDate ? new Date($scope.setDate.startDate) : new Date());
         angular.element("#toDate").datepicker({
            minDate: minDate,
            maxDate: maxDate,
            onSelect: function() {
               validateDates();
            }
         }).datepicker("setDate", $scope.setDate ? new Date($scope.setDate.endDate) : new Date());

      });

      $scope.$watch('setDate', function() {
         angular.element("#fromDate").datepicker("setDate", $scope.setDate ? new Date($scope.setDate.startDate) : new Date());
         angular.element("#toDate").datepicker("setDate", $scope.setDate ? new Date($scope.setDate.endDate) : new Date());
      })


      function validateDates() {
         fromDate = $('#fromDate').datepicker("getDate").toISOString();
         toDate = $('#toDate').datepicker("getDate").toISOString();


         if (fromDate < toDate) {

            $scope.updateRangeDisabled = false;
         } else {
            $scope.updateRangeDisabled = true;
         }
         $scope.$apply();
      }
      $scope.updateRange = function() {

         fromDate = $filter('datepickerRangeFormat')($('#fromDate').datepicker("getDate"));
         toDate = $filter('datepickerRangeFormat')($('#toDate').datepicker("getDate"));
         $scope.$emit('customDateRangePicked', { startDate: fromDate, endDate: toDate });
      }
   }

   module.service("datePickerService", datePickerService);

   datePickerService.$inject = ['$q', 'temporaryStorage'];

   function datePickerService($q, temporaryStorage) {
      log("Service: vsl.velocity.ui.datePicker");

      return;
   }

   module.directive("datePicker", datePicker);

   datePicker.$inject = [];

   function datePicker() {
      log("Directive: vsl.velocity.ui.datePicker");

      return {
         restrict: "E",
         scope: {
            minDate: '=mindate',
            maxDate: '=maxdate',
            setDate: '=setdate'
         },
         templateUrl: $localPath.combineUrls("datePicker.html"),
         controller: datePickerController,
         link: link,
         css: css
      };

      function link(scope, element, attributes) {
         log("Instance: vsl.velocity.ui.datePicker");
         return;
      }

   }

});
datePicker.js
Open with
3 of 4 items
datePicker.htmldatePicker.cssdatePicker.jstest.htmlDisplaying datePicker.css.
