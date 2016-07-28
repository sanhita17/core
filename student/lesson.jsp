<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en" ng-app="app">
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
   <link rel="stylesheet" type="text/css" href="../../../resources/css/k5i.css?${versionNumber}"/>
   <!-- K5I_ELA_CLIENT -->
   <link rel="stylesheet" type="text/css" href="${appClientRoot}/vsl/velocity/app.css?${versionNumber}">
   <!-- K5I_ELA_CLIENT | FONTS -->
   <link rel="stylesheet" type="text/css" href="${appClientRoot}/vsl/velocity/resources/fonts/fonts.css?${versionNumber}">
   <!-- =====^^^^^===================== CSS -->

</head>
<body audio-tap-start>
   <velocity-loading></velocity-loading>
   <student-navbar user="${userFullName}" problem-type="$root.problemTypeName" show-background>&nbsp;</student-navbar>

   <app-layout toggle-guides>
      <div class="lesson" onselectstart="return false" velocity-lesson ng-cloak>
         <vsl.core.lc.player class="player" scope-key="player"></vsl.core.lc.player>
      </div>
   </app-layout>

   <copyright access="SD" no-terms-of-use></copyright>

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
   <script src="${coreClientUrl}/vsl/core/lc/spec/spec.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/lc/player/player.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/coreDebug/coreDebug.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/uiSpine/src/spine.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/uiSpine/src/spine-canvas.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT -->
   <script src="${appClientRoot}/vsl/velocity/velocity.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app-lesson.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services/principalProperties.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/directives.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/filters.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/scenes/scenes.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | UI -->
   <script src="${appClientRoot}/vsl/velocity/ui/audioTapStart/audioTapStart.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/popupModal/popupModal.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/copyright/copyright.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/student/navbar/navbar.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/velocityLoading/velocityLoading.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/inactivityModal/inactivityModal.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/velocityTransition/velocityTransition.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | VIEWS -->
   <script src="${appClientRoot}/vsl/velocity/views/common/privacyPolicy/privacyPolicy.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/views/common/submitBug/submitBug.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/views/common/termsOfUse/termsOfUse.js?${versionNumber}"></script>

   <script src="${appClientRoot}/vsl/velocity/ui/appLayout/dist/appLayout.js?${versionNumber}"></script>
   <!-- =====^^^^^===================== JAVASCRIPT -->

   <!-- =====vvvvv===================== GLOBAL VARIABLES -->
   <script type="text/javascript">
      window.globals = {
         analyticsDns: "//www.google-analytics.com/analytics.js",
         analyticsUserId: "UA-67024200-1",
         appUuid:"${appUuid}",
         userUuid:"${userUuid}",
         sessionUuid:"${SESSIONUUID}",
         coreApiRoot:"${coreApiRoot}"+"/ws/",
         coreClientRoot:"${coreClientUrl}/",
         coreContentRoot:"${coreApiRoot}"+"/content/",
         appClientRoot:"${appClientRoot}/",
         csessionid: "${SESSIONUUID}",
         lpUuid: "${learningPathUuid}",
         session:${sessionObj},
         coreContentDns:"${coreContentDns}",
         coreLcSpecDns:"${coreLcSpecDns}",
         useType:"${useType}",
         appApiRoot:"${appApiRoot}/",
         versionNumber:"${versionNumber}"
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

   </body>
</html>
<script>VSL.analytics("pageview");</script>
