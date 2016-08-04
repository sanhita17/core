encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }
   function info() {
      console.info.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.nonStudent.navbar",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.nonStudent.navbar",[
      $localPath.combineUrls("navbar.css"),
      $localPath.combineUrls("../../../resources/images/icons.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.ui.nonStudent.navbar",[
      "ngAnimate",
      "angular.css",
      "vsl.velocity",
      "vsl.velocity.app.services",
      "vsl.velocity.app.service.currentSelections",
      "vsl.velocity.app.directives",
      "vsl.velocity.ui.popupModal"
   ]).run(function() {
      log("Module: vsl.velocity.ui.nonStudent.navbar");
   });

   module.controller("navbarController",navbarController);

   navbarController.$inject=["$scope", "$http", "$compile", "$timeout", "currentSelections"];

   function navbarController($scope, $http, $compile, $timeout, currentSelections) {
      log("Controller: vsl.velocity.ui.nonStudent.navbar");

      $scope.navMenuItem = currentSelections.getSelectedNavMenuItem();
      $scope.userDetails = currentSelections.getUserDetails();
      $scope.userRoles = currentSelections.getUserRoles();

      $scope.$watch(function($scope){ return $scope.navMenuItem; },function(nv){
         if (nv!=undefined) {
            //$scope.checkRequiredFields();
         }
      });

      $scope.$watch(function($scope){ return $scope.userDetails; },function(nv){
         if (nv!=undefined) {
            $scope.checkRequiredFields();
         }
      });

      $scope.$watch(function($scope){ return $scope.userRoles; },function(nv){
         if (nv!=undefined) {
            $scope.checkRequiredFields();
         }
      });

      $scope.$watch(currentSelections.getSelectedNavMenuItem,function(nv){
         if (nv!=undefined) {
            $scope.navMenuItem = nv;
         }
      });

      $scope.$watch(currentSelections.getUserDetails,function(nv){
         if (nv!=undefined) {
            $scope.userDetails = nv;
         }
      });

      $scope.$watch(currentSelections.getUserRoles,function(nv){
         if (nv!=undefined) {
            $scope.userRoles = nv;
         }
      });

      $scope.checkRequiredFields = function(){
         log("FUNC --> checkRequiredFields()");
         if (($scope.userRoles && currentSelections.userIsUnsupported()) && !$scope.navMenuItem) {
            $scope.navMenuItem = {primary:null,secondary:null,selected:null,current:0};
         }
         if ($scope.navMenuItem && $scope.userDetails && $scope.userRoles) {
            info("\t$scope.navMenuItem: ",($scope.navMenuItem?$scope.navMenuItem:""));
            info("\t$scope.userDetails: ",$scope.userDetails);
            info("\t$scope.userRoles: ",($scope.userRoles?$scope.userRoles:""));
            init();
         }
      };

      function init(){
         log("FUNC --> init()");
         if (currentSelections.userIsDistrict() || currentSelections.userIsCampus() || currentSelections.userIsTeacher()) {
            $scope.username = $scope.userDetails.user.userLogin;
            $scope.firstName = $scope.userDetails.user.firstName;
            $scope.lastName = $scope.userDetails.user.lastName;
         } else {
            if ($scope.userDetails && $scope.userDetails.user) {
               $scope.username = $scope.userDetails.user.userLogin || "Unknown";
               $scope.firstName = $scope.userDetails.user.firstName || "Unknown";
               $scope.lastName = $scope.userDetails.user.lastName || "User";
            } else {
               $scope.username = "Unknown";
               $scope.firstName = "Unknown";
               $scope.lastName = "User";
            }
         }
         $timeout(function(){
            $scope.uiReady=true;
         },100);
         $timeout(function(){
            $scope.adjustLogoutMenuItemWidth();
         },1000);
      }


      $scope.adjustLogoutMenuItemWidth = function(){
         var width=$(css.expand(".-nav-menu > LI:last-of-type > DIV")).width();
         $(css.expand(".-nav-menu > LI:last-of-type > UL DIV")).css({"width":width+40});
      };

      $scope.navMenuItemClicked = function(primary, secondary){
         //log("FUNC --> navMenuItemClicked("+primary+(secondary?", "+secondary:"")+")");
         if (primary!==4 && $scope.userViewingIntro && currentSelections.userIsDistrict()) return;
         if (primary) {
            if (!secondary && primary==$scope.navMenuItem.primary) {
               primary = null;
            }
            $scope.navMenuItem.primary = primary;
         } else {
            $scope.navMenuItem.primary = null;
         }
         if (secondary) {
            $scope.navMenuItem.secondary = secondary;
         } else {
            $scope.navMenuItem.secondary = null;
         }
         if (primary && secondary) {
            $scope.navMenuItem.primary = null;
            $scope.navMenuItem.secondary = null;
            $scope.navMenuItem.selected = primary+"."+secondary;
            $scope.navMenuItem.current = primary;
            if ( (currentSelections.userIsDistrict() && $scope.navMenuItem.selected!="2.1")
               || (currentSelections.userIsCampus() && $scope.navMenuItem.selected!="1.1")
               || (currentSelections.userIsTeacher() && $scope.navMenuItem.selected!="4.1") ) {
               currentSelections.setSelectedNavMenuItem($scope.navMenuItem);
            }
         }
         if (!primary && !secondary) {
            $scope.navMenuItem.selected = null;
            var code=$(event.target).attr("code") || undefined;
            if (code) $scope.navMenuItem.current = parseInt(code);
            currentSelections.setSelectedNavMenuItem($scope.navMenuItem);
         }
         log("FUNC --> navMenuItemClicked:selected "+($scope.navMenuItem.selected?$scope.navMenuItem.selected:"<nothing>"));
         log("FUNC --> navMenuItemClicked:current "+$scope.navMenuItem.current);
      };

      $scope.clickOccurred = function(){
         //log("FUNC --> clickOccurred()",arguments);
         if (event && event.target) {
            if (angular.element(event.target).closest(angular.element("NAV")).length==0 || event.target.nodeName.toUpperCase()==="NAV") {
               if ($scope.navMenuItem) {
                  $scope.navMenuItem.primary=null;
                  $scope.navMenuItem.secondary=null;
                  $scope.$digest();
               }
            }
         }
      };

      $scope.$on("vsl.velocity.app.userWithNoClasses", function(){
         $scope.navMenuItem.selected = "2.1";
         $scope.userWithNoClasses = true;
      });

      $scope.$on("vsl.velocity.app.userViewingIntro", function(){
         $(css.expand(".-nav-menu > LI:not(:last-of-type)")).addClass(css.expand("-disabled"));
         $scope.userViewingIntro = true;
      });

      $scope.$on("vsl.velocity.app.userCompletedIntro", function(){
         $scope.userViewingIntro = false;
         if ($scope.userWithNoClasses) {
            $(css.expand(".-nav-menu > LI:nth-child(2)")).removeClass(css.expand("-disabled"));
         } else {
            $(css.expand(".-nav-menu > LI:not(:last-of-type)")).removeClass(css.expand("-disabled"));
         }
      });

      $scope.$watch(currentSelections.getUserRoles,function(nv){
         if (nv!=undefined) {
            $http.get($scope.getTemplateUrl()).then(function(response) {
               var html = $compile(angular.element(css.cook(response.data,css.expand())))($scope);
               $scope.element.html(html);
            });
         }
      });

      $scope.getTemplateUrl = function() {
         if (currentSelections.userIsDistrict()) {
            return $localPath.combineUrls("district-navbar.html");
         } else if (currentSelections.userIsCampus()) {
            return $localPath.combineUrls("campus-navbar.html");
         } else if (currentSelections.userIsTeacher()) {
            return $localPath.combineUrls("teacher-navbar.html");
         } else {
            return $localPath.combineUrls("generic-navbar.html");
         }
      };

   }

   module.directive("navbar",navbar);

   navbar.$inject=[];

   function navbar() {
      log("Directive: vsl.velocity.ui.nonStudent.navbar");

      return {
         restrict: "E",
         replace: true,
         templateUrl: $localPath.combineUrls("navbar.html"),
         controller: navbarController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.nonStudent.navbar");

         $scope.element = element;

         angular.element(document.body).on("click",clickOccurred);
         function clickOccurred(){
            $scope.clickOccurred.apply(null,arguments);
         }
         $scope.$on("$destroy",function(){
            angular.element(document.body).off("click",clickOccurred);
         });

         return;
      }

   }

});
