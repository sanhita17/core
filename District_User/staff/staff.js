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

   log("Script: vsl.velocity.views.district.staff", $localPath);

   var transitionTime = 1;

   var css = angular.css("vsl.velocity.views.district.staff", [
      $localPath.combineUrls("staff.css")
   ], transitionTime);

   var module = angular.module("vsl.velocity.views.district.staff", [
      "vsl.core.sis",
      "vsl.velocity",
      "vsl.velocity.app.services",
      "vsl.velocity.app.service.currentSelections",
      "vsl.velocity.ui.pageHeader",
      "vsl.velocity.ui.scrollableRegion"
   ]).run(function() {
      log("Module: vsl.core.sis.views.district.staff");
   });

   module.controller("staffController", districtStaffController);

   districtStaffController.$inject = ["$scope", "currentSelections", "districtStaffService"];

   function districtStaffController($scope, currentSelections, districtStaffService) {
      log("Controller: vsl.velocity.views.district.staff");

      warn("\tcurrentSelections.getUserDetails: ",(currentSelections.getUserDetails()?currentSelections.getUserDetails():""));

      currentSelections.setSelectedView("vsl.core.sis.views.district.staff");
      currentSelections.setSelectedNavMenuItem({ primary: null, secondary: null, selected: 1.2, current: 1 });

      $scope.pageHeaderSettings = {
         primaryHeading: "District Staff",
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
         districtStaffService.getUserStats($scope.userDetails.user.districtMasterUuid).then(function(data){
            if (data && data.success) {
               $scope.processData(data.userStats);
            } else {
               error("ERROR --> Message: districtStaffService.getUserStats("+$scope.userDetails.user.districtMasterUuid+") failed");
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
                  if ($scope.userList.length>0) {
                     log(person.user.uuid,$scope.userList[$scope.userList.length-1].person.user.uuid);
                     hideName = (person.user.uuid==$scope.userList[$scope.userList.length-1].person.user.uuid);
                  }
                  $scope.userList.push({person:person, personIndex: personIndex});
                  $scope.userList[$scope.userList.length-1].hideName = hideName;
                  $scope.userList[$scope.userList.length-1].school = school.campusName;
                  $scope.userList[$scope.userList.length-1].schoolIndex = schoolIndex;
                  $scope.userList[$scope.userList.length-1].roles = $scope.getUserRoles(school.roleNames);
                  $scope.userList[$scope.userList.length-1].classCount = (school.campusName ? school.classCount : undefined);
                  $scope.userList[$scope.userList.length-1].studentCount = (school.campusName ? school.studentCount : undefined);
                  //log(person.user.firstName,person.user.lastName,school.campusName || undefined,undefined,school.classCount,school.studentCount,person.user.email);
               });
            } else {
               $scope.userList.push({person: person, personIndex: personIndex, school: undefined, schoolIndex: 0, roles: undefined, classes: undefined, students: undefined});
               //log(person.user.firstName,person.user.lastName,undefined,undefined,undefined,undefined,person.user.email);
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

   module.service("districtStaffService", districtStaffService);

   districtStaffService.$inject = ["$q", "vsl.core.sis.userService"];

   function districtStaffService($q, userService) {
      log("Service: vsl.core.sis.views.district.staff");

      var services = {};

      services.getUserStats = function(districtMasterUuid) {
         var deferred = $q.defer();
         var params={
            applicationUuid: window.globals.appUuid,
            districtMasterUuid: districtMasterUuid
         };
         userService.getUserStats(params).success(function(data, status, header, config){
            deferred.resolve(data.result);
         });
         return deferred.promise;
      };

      return services;
   }

   module.directive("districtStaff", districtStaff);

   districtStaff.$inject = [];

   function districtStaff() {
      log("Directive: vsl.velocity.views.district.staff");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("staff.html"),
         controller: districtStaffController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.views.district.staff");

         return;
      }

   }

});
