encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console, arguments);
   }

   log("Script: vsl.velocity.views.teacher.classList", $localPath);

   var transitionTime = 1;

   var css = angular.css("vsl.velocity.views.teacher.classList", [
      $localPath.combineUrls("classList.css"),
      $localPath.combineUrls("../../../resources/styles/contentTable.css")
   ], transitionTime);

   var module = angular.module("vsl.velocity.views.teacher.classList", [
      "angular.css",
      "vsl.velocity.ui.pageHeader",
      "vsl.velocity.ui.scrollableRegion",
      "vsl.velocity.ui.velocitySelect",
      "vsl.velocity.ui.teacher.subNavbar",
      "vsl.velocity.app.services",
      "vsl.velocity.app.service.schoolClassList"
   ]).run(function() {
      log("Module: vsl.velocity.views.teacher.classList");
   });

   module.controller("classListController", classListController);

   classListController.$inject = ['$scope', '$filter', '$timeout', '$location', 'schoolClassList', 'classListService', 'temporaryStorage', '$modal'];

   function classListController($scope, $filter, $timeout, $location, schoolClassList, classListService, temporaryStorage, $modal) {
      log("Controller: vsl.velocity.views.teacher.classList");
      temporaryStorage.set('currentView', "vsl.velocity.views.teacher.classList");

      temporaryStorage.set('navMenuItem', { primary: null, secondary: null, selected: 2.1, current: 2 }, true).then(function() {
         $scope.$emit("vsl.velocity.ui.teacher.navbar.forceChange");
      });

      var schoolClassNameArray = [];
      var params, users = null;
      var windowGlobalsCampusMasters = window.globals.campusMasters.match(/\[(.*)\]/i)[1];
      var windowGlobalsDistrictTracks = window.globals.districtTracks.match(/\[(.*)\]/i)[1];
      getUsers();
      $scope.addNewClass = false;
      $scope.addingNewClass = false;
      $scope.newClass = { name: null };
      $scope.pageHeaderSettings = {
         primaryHeading: "My Classes",
         canAdd: true,
         canPrint: true
            //addDisabled: true
      };
      $scope.settings = {};
      init();

      function init() {
         log("FUNC --> init()");

         schoolClassList.getList().then(function(data) {
            log("\tresults: ", data);
            console.log("response", data)
            try { VSL.analytics("report", "Teacher/ClassList", data.schoolclasses.length + " Classes"); } catch (e) {}
            $scope.classDetails = data.schoolclasses;
            var schoolClassNameArray = [];
            angular.forEach($scope.classDetails, function(schoolClass) {
               // console.log("schoolClass.districtMasterUuid", schoolClass.districtMasterUuid);
               schoolClassNameArray.push({
                  name: schoolClass.schoolclassName,
                  uuid: schoolClass.schoolclassUuid,
                  campusMasterUuid: schoolClass.campusMasterUuid,
                  districtMasterUuid: schoolClass.districtMasterUuid
               });
               schoolClassNameArray.sort(function(a, b) {
                  return a.name.localeCompare(b.name);
               });
               temporaryStorage.set('schoolClassNameArray', schoolClassNameArray, true);

            });

         });
      }
      $scope.goToClassRoster = function(schoolClassName, schoolClassUuid, campusMasterUuid, districtMasterUuid) {
         temporaryStorage.set('schoolClassSelected', { name: schoolClassName, uuid: schoolClassUuid, campusMasterUuid: campusMasterUuid, districtMasterUuid: districtMasterUuid }, true);
         var param = $filter('beautifyUrl')(schoolClassName);
         $location.path('rosters');
      };

      $scope.classListOptionsClicked = function(index) {
         if (index + 1 > $scope.classDetails.length - 5) {
            $timeout(function() {
               var div = angular.element(".scroll-content");
               div.stop().animate({ scrollTop: $(div)[0].scrollHeight }, 500);
            }, 0);
         }
      };



      $scope.$on('plusClicked', function() {
         $scope.addNewClass = !$scope.addNewClass;
      })

      $scope.addClass = function() {
         $scope.addingNewClass = true;
         params = [{
            "schoolClasses": [{
               "className": $scope.newClass.name,
               "isActive": "true",
               "districtTrackUuid": windowGlobalsDistrictTracks,
               "campusMasterUuid": windowGlobalsCampusMasters,
               "gradeLevelCode": "VCTY",
               "teacherUuid": window.globals.userUuid
            }]
         }];
         classListService.addClass(params).then(function(response) {
            $scope.addNewClass = false;
            $scope.addingNewClass = false;
            init();
         })
      }

      $scope.deleteClass = function(data) {
         $scope.settings = {
            title: "Delete Class",
            action: "editClassInfo",
            data: data,
            enableStudentSaveBtn: true,
            hasClose: true,
            buttons: {
               accept: "OK",
               reject: "Cancel"
            },
            default: "accept"
         }
         $modal.open({
            templateUrl: $localPath.combineUrls("deleteClassInfo/deleteClassInfo.html"),
            scope: $scope
         }).result.then(function(reason) {
            if (reason == 'accept') {
               log("\tdeleteClassInfo - acceptClicked");
               deleteClassFn(data);
            } else {
               log("\tdeleteClassInfo - rejectClicked");
            }
         }, function(reason) {
            log("\tdeleteClassInfo - closeClicked");
         });

      }

      function deleteClassFn(data) {
         params = [{
            "schoolClasses": [{
               "className": data.schoolclassName,
               "isActive": "false",
               "districtTrackUuid": windowGlobalsDistrictTracks,
               "campusMasterUuid": windowGlobalsCampusMasters,
               "gradeLevelCode": "VCTY",
               "teacherUuid": window.globals.userUuid
            }]
         }];
         classListService.deleteClass(params).then(function(response) {
            init();
         })
      }


      function getUsers() {
         params = [{ "campusMasterUuid": windowGlobalsCampusMasters, "includeRoles": "true" }]
         return classListService.getUsers(params).then(function(response) {
            temporaryStorage.set('classList:users', response)
            console.log("getusers", response)
         })
      }

      $scope.editClassInfo = function(data) {

         $scope.settings = {
            title: "Edit Class",
            action: "editClassInfo", //what is this action attribute... please check?
            data: data,
            enableStudentSaveBtn: true,
            hasClose: true,
            buttons: {
               accept: "OK"
                  //reject: "Cancel"
            },
            default: "accept",
            keepOpenOnAccept: true,
            width: 700,
            disabled: true,
            error: false,
            processing: false,
            success: false,
            errorText: { validation: '', vport: '' },
            errorField: {}
         };
         temporaryStorage.get('classList:users').then(function(users) {
            $scope.settings.users = users
         })
         $modal.open({
            templateUrl: $localPath.combineUrls("editClassInfo/editClassInfo.html"),
            scope: $scope
         }).result.then(function(reason) {
            if (reason == 'accept') {
               log("\teditStudent - acceptClicked");
            } else {
               log("\teditStudent - rejectClicked");
            }
         }, function(reason) {
            log("\teditStudent - closeClicked");
         });
      }
      $scope.$on("vsl.velocity.ui.popupModal-acceptNoClose", function() {

         if ($scope.settings.selectedOption) {
            $scope.settings.disabled = true;
            params = [{
               "systemUsers": [{
                  "firstName": $scope.settings.selectedOption.firstName,
                  "lastName": $scope.settings.selectedOption.lastName,
                  "email": $scope.settings.selectedOption.email,
                  "districtMasterUuid": windowGlobalsDistrictTracks,
                  "userType": "CAMPUS"
               }]
            }]
            classListService.addTeacher(params).then(function(response) {
               params = [{
                  "userUuid": $scope.settings.selectedOption.uuid,
                  "systemUserRoles": [{
                     "roleName": "VIP_Teacher",
                     "entityType": "Campus",
                     "entityUuid": windowGlobalsCampusMasters
                  }]
               }]
               classListService.addTeacherRole(params).then(function(response) {
                  $scope.settings.data.teachers.push($scope.settings.selectedOption);
                  $scope.settings.selectedOption = null;
               }, function(response) {
                  alert("error adding teacher role");
               })
            }, function(response) {
               alert("error adding teacher");
            })

         }


      });

      $scope.$on("option:selected", function(event, data) {
         $scope.settings.disabled = data.disableOKButton;
      })

   }


   module.service("classListService", classListService);

   classListService.$inject = ['$http', '$q', 'temporaryStorage', '$filter'];

   function classListService($http, $q, temporaryStorage, $filter) {
      log("Service: vsl.velocity.views.teacher.classList.classListService");

      var service = {};


      service.addClass = function(params) {
         var deferred = $q.defer();
         var credentials = {
            "jsonrpc": "2.0",
            "id": "123",
            "method": "putSchoolClasses",
            "params": params
         };
         $http.post(
            window.globals.coreSisUrl.combineUrls("schoolClass.json"),
            credentials, { headers: { 'Content-Type': 'application/json', "CSESSIONID": window.globals ? window.globals.csessionid : '' } }
         ).success(function(data, status, header, config) {
            deferred.resolve(data.result);
         });
         return deferred.promise;

      }



      service.deleteClass = function(params) { //though exact copy of add class, assumed with addition of parameters in future. so made seperate fn.
         var deferred = $q.defer();
         var credentials = {
            "jsonrpc": "2.0",
            "id": "123",
            "method": "putSchoolClasses",
            "params": params
         };
         $http.post(
            window.globals.coreSisUrl.combineUrls("schoolClass.json"),
            credentials, { headers: { 'Content-Type': 'application/json', "CSESSIONID": window.globals ? window.globals.csessionid : '' } }
         ).success(function(data, status, header, config) {
            deferred.resolve(data.result);
         });
         return deferred.promise;

      }


      service.getUsers = function(params) {
         console.log("response", params)
         var deferred = $q.defer();
         var credentials = {
            "jsonrpc": "2.0",
            "id": "123",
            "method": "getUsers",
            "params": params
         };
         $http.post(
            window.globals.coreSisUrl.combineUrls("user.json"),
            credentials, { headers: { 'Content-Type': 'application/json', "CSESSIONID": window.globals ? window.globals.csessionid : '' } }
         ).success(function(data, status, header, config) {
            deferred.resolve(data.result.systemUsers);
         });
         return deferred.promise;
      }


      service.addTeacher = function(params) {
         var deferred = $q.defer();
         var credentials = {
            "jsonrpc": "2.0",
            "id": "123",
            "method": "putUsers", //get the methods
            "params": params
         };
         $http.post(
            window.globals.coreSisUrl.combineUrls("user.json"), //get the url
            credentials, { headers: { 'Content-Type': 'application/json', "CSESSIONID": window.globals ? window.globals.csessionid : '' } }
         ).success(function(data, status, header, config) {
            deferred.resolve(data.result.systemUsers);
         });
         return deferred.promise;
      }


      service.addTeacherRole = function(params) {
         var deferred = $q.defer();
         var credentials = {
            "jsonrpc": "2.0",
            "id": "123",
            "method": "addRolesToUser", //get the methods
            "params": params
         };
         $http.post(
            window.globals.coreSisUrl.combineUrls("user.json"), //get the url
            credentials, { headers: { 'Content-Type': 'application/json', "CSESSIONID": window.globals ? window.globals.csessionid : '' } }
         ).success(function(data, status, header, config) {
            deferred.resolve(data.result.systemUsers);
         });
         return deferred.promise;
      }



      service.addRoles = function() {
         var deferred = $q.defer();
         var credentials = {
            "jsonrpc": "2.0",
            "id": "123",
            "method": "addRolesToUser",
            "params": [{
               "userUuid": "D0C68289-DB47-40EE-99F6-BEA6C86B01E1",
               "systemUserRoles": [
                  { "roleName": "Teacher", "entityType": "Campus", "entityUuid": "786C9873-2ACC-4E81-B32E-CEE20E378ACF" }
               ]
            }]
         }
         $http.post(
            window.globals.coreSisUrl.combineUrls("user.json"),
            credentials, { headers: { 'Content-Type': 'application/json', "CSESSIONID": window.globals ? window.globals.csessionid : '' } }
         ).success(function(data, status, header, config) {
            // console.log(data)

            deferred.resolve(data.result);
         });
         return deferred.promise;


      }

      return service;
   }






   module.directive("classList", classList);

   classList.$inject = [];

   function classList() {
      log("Directive: vsl.velocity.views.teacher.classList");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("classList.html"),
         controller: classListController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.views.teacher.clasList");

         return;
      }

   }

   module.filter('getTeachersName', getTeachersName)
   getTeachersName.$inject = [];

   function getTeachersName() {
      return function(teachersArray) {
         var teacherName = '';

         angular.forEach(teachersArray, function(teacher) {
            teacherName = teacherName + teacher.lastName + " " + teacher.firstName + ", ";
         })
         return teacherName.replace(/,\s*$/, "");;
      }
   }

});
