encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console, arguments);
   }
   function warn() {
      console.warn.apply(console,arguments);
   }
   function info() {
      console.info.apply(console,arguments);
   }
   function error() {
      console.error.apply(console,arguments);
   }

   log("Script: vsl.velocity.views.campus.staff", $localPath);

   var transitionTime = 1;

   var css = angular.css("vsl.velocity.views.campus.staff", [
      $localPath.combineUrls("staff.css")
   ], transitionTime);

   var module = angular.module("vsl.velocity.views.campus.staff", [
      "vsl.core.sis",
      "vsl.velocity",
      "vsl.velocity.app.services",
      "vsl.velocity.app.service.currentSelections",
      "vsl.velocity.ui.pageHeader",
      "vsl.velocity.ui.scrollableRegion"
   ]).run(function() {
      log("Module: vsl.core.sis.views.campus.staff");
   });

   module.controller("campusStaffController", campusStaffController);

   campusStaffController.$inject = ["$scope", "currentSelections", "campusStaffService"];

   function campusStaffController($scope, currentSelections, campusStaffService) {
      log("Controller: vsl.velocity.views.campus.staff");

      warn("\tcurrentSelections.getUserDetails: ",(currentSelections.getUserDetails()?currentSelections.getUserDetails():""));

      currentSelections.setSelectedView("vsl.core.sis.views.campus.staff");
      currentSelections.setSelectedNavMenuItem({ primary: null, secondary: null, selected: 1.1, current: 1 });

      $scope.pageHeaderSettings = {
         primaryHeading: "Campus Staff",
         canPrint: true
      };

      $scope.roleNamesArray = {
         "VIP_Campus_Coach": "Campus Coach",
         "VIP_Campus_User": "Campus User",
         "VIP_Principal": "Principal",
         "VIP_Teacher": "Teacher",
         "VIP_District_Superintendent": "District Superintendent",
         "VIP_Coordinator": "Coordinator",
         "VIP_Resource_User": "Resource User"
      };

      $scope.$watch(currentSelections.getUserDetails,function(nv){
         if (nv!=undefined) {
            $scope.userDetails = nv;
            $scope.checkRequiredFields();
         }
      });

      $scope.checkRequiredFields = function(){
         log("FUNC --> checkRequiredFields()");
         if ($scope.userDetails) {
            info("\t$scope.userDetails: ",($scope.userDetails?$scope.userDetails:""));
            init();
         }
      };

      function init() {
         log("FUNC --> init()");
         $scope.userList = undefined;
         $scope.$root.$broadcast("vsl.velocity.ui.pageHeader:disableActions");

         log("EXEC --> executing...");
         campusStaffService.getUserStats($scope.userDetails.schoolStats[0].campusUuid).then(function(data){
            if (data && data.success) {
               $scope.processData(data.userStats);
            } else {
               error("ERROR --> Message: campusStaffService.getUserStats("+$scope.userDetails.user.campusMasters[0].uuid+") failed");
            }
            if ($scope && $scope.$root) {
               $scope.$root.$broadcast("vsl.velocity.ui.pageHeader:enableActions");
            }
         });
      }

      $scope.processData = function(data){
         log("PROC --> processing...");
         log("\t RAW: ",data);

         var personIndex = -1;
         angular.forEach(data, function(person){
            personIndex++;
            if (!$scope.userList)
               $scope.userList = [];
            if (person.schoolStats.length>0) {
               var schoolIndex = -1;
               angular.forEach(person.schoolStats,function(school){
                  var hideName;
                  schoolIndex++;
                  if ($scope.userList.length>0)
                     hideName = (person.user.uuid==$scope.userList[$scope.userList.length-1].person.user.uuid);
                  $scope.userList.push({person:person, personIndex: personIndex});
                  $scope.userList[$scope.userList.length-1].hideName = hideName;
                  $scope.userList[$scope.userList.length-1].roles = $scope.getUserRoles(school.roleNames);
                  $scope.userList[$scope.userList.length-1].classCount = (school.campusName ? school.classCount : undefined);
                  $scope.userList[$scope.userList.length-1].studentCount = (school.campusName ? school.studentCount : undefined);
                  //log(person.user.firstName,person.user.lastName,undefined,school.classCount,school.studentCount,person.user.email);
               });
            } else {
               $scope.userList.push({person: person, personIndex: personIndex, roles: undefined, classes: undefined, students: undefined});
               //log(person.user.firstName,person.user.lastName,undefined,undefined,undefined,person.user.email);
            }
         });

         log("\tMADE [userList]: ",$scope.userList);

         $scope.userList.sort(function(a,b){
            return a.person.user.lastName.localeCompare(b.person.user.lastName);
         });

         log("\tSRTD [userList]: ",$scope.userList);

         var personIndex = -1;
         angular.forEach($scope.userList,function(user,index){
            if (index==0) {
               user.personIndex = personIndex++;
            } else {
               if (user.person.user.uuid == $scope.userList[index-1].person.user.uuid) {
                  user.personIndex = personIndex;
               } else {
                  user.personIndex = personIndex++;
               }
            }
         });

         log("\tDONE [userList]: ",$scope.userList);
      };

      $scope.getUserRoles = function(roleNames){
         var roles = "";
         angular.forEach(roleNames, function(roleName) {
            if (Object.keys($scope.roleNamesArray).indexOf(roleName) !== -1) {
               roles += (roles.length>0 ? ", " : "") + $scope.roleNamesArray[roleName];
            }
         });
         return roles;
      };

      return;
   }

   module.service("campusStaffService", campusStaffService);

   campusStaffService.$inject = ["$http", "$q", "vsl.core.sis.userService"];

   function campusStaffService($http, $q, userService) {
      log("Service: vsl.core.sis.views.campus.staff");

      var services = {};

      services.getUserStats = function(campusMasterUuid) {
         var deferred = $q.defer();
         var params={
            applicationUuid: window.globals.appUuid,
            campusMasterUuid: campusMasterUuid
         };
         userService.getUserStats(params).success(function(data, status, header, config){
            deferred.resolve(data.result);
         });
         return deferred.promise;
      };

      return services;
   }

   module.directive("campusStaff", campusStaff);

   campusStaff.$inject = [];

   function campusStaff() {
      log("Directive: vsl.velocity.views.campus.staff");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("staff.html"),
         controller: campusStaffController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.views.campus.staff");

         return;
      }

   }

});
