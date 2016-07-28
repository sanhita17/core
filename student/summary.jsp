<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html class="no-js">
<head>
   <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
   <meta http-equiv="Cache-Control" content="no-cache"/>
   <meta http-equiv="Pragma" content="no-cache"/>
   <meta http-equiv="Expires" content="-1"/>
   <title>Velocity®</title>

   <link id="web-icon" rel="shortcut icon"  href="../../../resources/images/favicon.ico"/>
   <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro">

   <!-- =====vvvvv===================== CSS -->
   <!-- CORE | BOWER_COMPONENTS -->
   <link rel="stylesheet" type="text/css" href="${coreClientUrl}/bower_components/ng-prettyjson/dist/ng-prettyjson.min.css">
   <link rel="stylesheet" type="text/css" href="${coreClientUrl}/bower_components/bootstrap/dist/css/bootstrap.css">
   <link rel="stylesheet" type="text/css" href="${coreClientUrl}/bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css">
   <!-- K5I_ELA -->
   <link rel="stylesheet" type="text/css" href="../../../resources/css/k5i.css?${versionNumber}" media="screen" />
   <!-- K5I_ELA_CLIENT -->
   <link rel="stylesheet" type="text/css" href="${appClientRoot}/vsl/velocity/app.css?${versionNumber}">
   <!-- K5I_ELA_CLIENT | FONTS -->
   <link rel="stylesheet" type="text/css" href="${appClientRoot}/vsl/velocity/resources/fonts/fonts.css?${versionNumber}">
   <!-- =====^^^^^===================== CSS -->

</head>

<body ng-app="app" ng-controller="summaryController" audio-tap-start>
   <student-navbar user="${userFullName}" problem-type="problemTypeName">&nbsp;</student-navbar>
   <vitals-page ng-if="!isPostStartup" username="${userFullName}"></vitals-page>
   <post-startup ng-if="isPostStartup" username="${userFullName}"></post-startup>
   <copyright style="z-index:89;" access="S" no-terms-of-use></copyright>

   <!-- =====vvvvv===================== JAVASCRIPT -->
   <!-- CORE | BOWER_COMPONENTS -->
   <script src="${coreClientUrl}/bower_components/jquery/dist/jquery.js"></script>
   <script src="${coreClientUrl}/bower_components/jquery-ui/jquery-ui.min.js"></script>
   <script src="${coreClientUrl}/bower_components/jplayer/dist/jplayer/jquery.jplayer.min.js"></script>
   <script src="${coreClientUrl}/bower_components/angular/angular.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-animate/angular-animate.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-cookies/angular-cookies.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-resource/angular-resource.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-route/angular-route.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-sanitize/angular-sanitize.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-media-player/dist/angular-media-player.min.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-touch/angular-touch.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-bootstrap/ui-bootstrap.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
   <script src="${coreClientUrl}/bower_components/oclazyload/dist/ocLazyLoad.js"></script>
   <script src="${coreClientUrl}/bower_components/ng-prettyjson/dist/ng-prettyjson.min.js"></script>
   <script src="${coreClientUrl}/bower_components/ua-parser-js/dist/ua-parser.min.js"></script>
   <script src="${coreClientUrl}/bower_components/ng-idle/angular-idle.min.js"></script>
   <!-- CORE_CLIENT -->
   <script src="${coreClientUrl}/vsl/vsl.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/angular.q.extended.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/angular.css.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/core.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/lc/lc.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/coreDebug/coreDebug.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/audioPlayer/audioPlayer.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/iconButton/iconButton.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/uiSpine/src/spine.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/uiSpine/uiSpine.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/nextButton/nextButton.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT -->
   <script src="${appClientRoot}/vsl/velocity/velocity.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services/principalProperties.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/directives.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/filters.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | UI -->
   <script src="${appClientRoot}/vsl/velocity/ui/audioTapStart/audioTapStart.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/popupModal/popupModal.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/copyright/copyright.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/student/navbar/navbar.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/inactivityModal/inactivityModal.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | VIEWS -->
   <script src="${appClientRoot}/vsl/velocity/views/student/vitalsPage/vitalsPage.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/views/student/postStartup/postStartup.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/views/common/privacyPolicy/privacyPolicy.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/views/common/submitBug/submitBug.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/views/common/termsOfUse/termsOfUse.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/scenes/scenes.js?${versionNumber}"></script>
   <!-- =====^^^^^===================== JAVASCRIPT -->

   <!-- =====vvvvv===================== GLOBAL VARIABLES -->
   <script type="text/javascript">
      window.globals={
         analyticsDns:"//www.google-analytics.com/analytics.js",
         analyticsUserId:"UA-67024200-1",
         appUuid:"${appUuid}",
         userUuid:"${userUuid}",
         sessionUuid:"${SESSIONUUID}",
         coreApiRoot:"${coreApiRoot}/ws/",
         coreSisUrl:"${coreSisUrl}"+"/ws/",
         coreClientRoot:"${coreClientUrl}/",
         appClientRoot:"${appClientRoot}/",
         appApiRoot:"${appApiRoot}/",
         useType:"${useType}",
         versionNumber:"1.5.0"
      };
   </script>
   <!-- =====^^^^^===================== GLOBAL VARIABLES -->

   <!-- =====vvvvv===================== FAVICON FORCE NO CACHE -->
   <script type="text/javascript">
      $(function() {
         var webIcon = $('#web-icon');
         var webIconSrc = webIcon.attr('href');
         webIcon.attr('href',webIconSrc+'?u='+new Date().getTime());
      });
   </script>
   <!-- =====^^^^^===================== FAVICON FORCE NO CACHE -->

   <script>
      (function($localPath){
         angular.module("app",[
                               "ngCookies",
                               "vsl.core",
                               "vsl.core.lc",
                               "vsl.velocity",
                               "vsl.velocity.app.services",
                               "vsl.velocity.app.filters",
                               "vsl.velocity.ui.audioTapStart",
                               "vsl.velocity.ui.student.navbar",
                               "vsl.velocity.ui.popupModal",
                               "vsl.velocity.ui.copyright",
                               "vsl.velocity.views.common.submitBug",
                               "vsl.core.ui.vitalsPage",
                               "vsl.core.ui.postStartup",
                               "vsl.core.ui.coreDebug",
                               "vsl.velocity.scenes"
                              ]);

         angular.module("app").run(config);

         config.$inject=["vsl.velocity.scenes.service"];

         function config(scenesService,userPropertyService) {
            scenesService.setWorld();
         }

         angular.module("app").controller('summaryController',summaryController);

         summaryController.$inject=['$scope', '$location', 'vsl.velocity.problemService' ,"vsl.core.userPropertyService"];

         function summaryController($scope, $location, problemService, userPropertyService) {
            var mylocation = window.location.toString();
            var geturls = mylocation.split('?');

            if(!(geturls.length > 1)) {
               $scope.uiError = true;
            } else {
               var ids = geturls[1].split('&');
               var nodeuuid = ids[0].split('=')[1];
               var lpuuid = ids[1].split('=')[1];
               var lpid = ids[2].split('=')[1];
               /* var flag = ids[2].split('=')[1];*/
               if( typeof(nodeuuid) === 'undefined' || typeof(lpuuid) === 'undefined' ) {
                  $scope.uiError = true;
               } else {
                  problemService.getLearningPath({"learningPathUuid": lpid}).success(function(response) {
                     if(angular.isDefined(response) && angular.isDefined(response.result) && response.result != null) {
                        if(response.result.learningPathType == "STATIC") {
                           $scope.isPostStartup = true;
                        } else {
                           $scope.isPostStartup = false;
                        }
                     }
                  });
               }
            }
            userPropertyService.set({"EngagementSummaryPageSeen":true});

         }
      })(window.location.href);
   </script>

</body>
</html>
<script>VSL.analytics("pageview");</script>
