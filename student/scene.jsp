   <%@ include file="../common/_taglibs.jsp"%>
<!DOCTYPE html>
<html lang="en" class="no-js" ng-app="vsl.velocity.scenes.app">
<head>
   <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
   <meta http-equiv="Cache-Control" content="no-cache"/>
   <META http-equiv="Pragma" content="no-cache"/>
   <META http-equiv="Expires" content="-1"/>
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

   <style>
      .fade {
          opacity:0;
      }
      .nextButton {
              z-index:5000;
              display:none;
              opacity:0;
              transition: opacity 1s;
      }
      .nextButton.ready {
              display:block;
              opacity:1;
      }
   </style>

</head>
<body ng-controller="vsl.velocity.scenes.app.controller" audio-tap-start>

   <student-navbar user="${userFullName}" problem-type="problemTypeName" style="z-index:2;" hide-logo>&nbsp;</student-navbar>

   <!-- =====vvvvv===================== CHEAT MODAL CODE [HTML] ===== "C"+(C) CLICK -->
   <div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="width:560px;">
         <div class="modal-content" style="width:560px;">
            <div id="debugPanel" style="margin:20px;padding:10px;background-color:rgba(0,0,0,.1);border-radius:4px;">
               <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ffffff;">
                  Click this to reset your user.<br>
                  <input type="button" value="Reset User" onclick="javascript:resetUser();" style="width:125px;"></input>
                  <input type="button" value="Reset Adaptive" onclick="javascript:resetUser(true);" style="width:125px;"></input>
               </div>
               <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ffffff;">
                  Click this to manually create an alert to appear on the teacher's dashboard.<br>
                  <input type="button" value="Create Teacher Alert" onclick="javascript:createNotification();" style="width:150px;"></input>
               </div>
               <form action="/debugLearningPath" method="post" id="selectLPForm">
                  <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ffffff;">
                     If you want to start on a particular lesson type,<br>
                     select the lesson type and click 'Select Lesson Type' button:<br>
                     <select id="lessonType" name="lessonType" form="selectLPForm" style="width:365px;">
                     <c:forEach items="${lessonTypes}" var="lessonType">
                        <option value="${lessonType.uuid}">${lessonType.name}</option>
                     </c:forEach>
                     </select>
                     <input type="button" value="Select Lesson Type"  onclick="javascript:setLessonType()" style="width:125px;"></input>
                  </div>
                  <div style="margin-bottom:10px;">
                     If you want to start on a particular lesson within the selected lesson type,<br>
                     select the lesson and click 'Select Lesson' button:<br>
                     <select id="lesson" name="lesson" form="selectLPForm" style="width:365px;">
                     </select>
                     <input type="button" value="Select Lesson"  onclick="javascript:setLesson()" style="width:125px;"></input>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
   <!-- =====^^^^^===================== CHEAT MODAL CODE [HTML] ===== "C"+(C) CLICK -->

   <scene-player ng-repeat="scene in scenes" ng-class="{'fade':scene.fade}" scene="scene" style="position:absolute;top:0;left:0;right:0;bottom:0;transition:opacity 0.5s"></scene-player>

   <a class="nextButton circle jqbounce" style="margin-bottom:10px;" sfx-click ng-class="{'ready':readyForLesson}" onclick="$('#continueForm').submit();"><span class="jumpy-arrow"></span></a>

   <form class="hidden" id="continueForm" action="/lessons" method="post"></form>

   <copyright access="SC" no-terms-of-use></copyright>

   <!-- =====vvvvv===================== JAVASCRIPT -->
   <script src="../../../resources/js/jquery-2.1.1.js"></script>
   <script src="../../../resources/js/bootstrap.min.js"></script>
   <!-- CORE | BOWER_COMPONENTS -->
   <script src="${coreClientUrl}/bower_components/jquery-ui/jquery-ui.min.js"></script>
   <script src="${coreClientUrl}/bower_components/angular/angular.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-animate/angular-animate.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-cookies/angular-cookies.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-bootstrap/ui-bootstrap.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-cookies/angular-cookies.js"></script>
   <script src="${coreClientUrl}/bower_components/oclazyload/dist/ocLazyLoad.js"></script>
   <script src="${coreClientUrl}/bower_components/ua-parser-js/dist/ua-parser.min.js"></script>
   <script src="${coreClientUrl}/bower_components/ng-idle/angular-idle.min.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-sanitize/angular-sanitize.js"></script>
   <!-- CORE_CLIENT -->
   <script src="${coreClientUrl}/vsl/vsl.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/angular.q.extended.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/angular.css.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/core.js?${versionNumber}"></script>
   <!-- CORE -->
   <script src="${coreClientUrl}/vsl/core/ui/coreDebug/coreDebug.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/audioPlayer/audioPlayer.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/soundEffects/soundEffects.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/uiSpine/src/spine.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/ui/uiSpine/uiSpine.js?${versionNumber}"></script>
   <!-- CORE_CLIENT | TOOLS -->
   <script src="${coreClientUrl}/vsl/core/tools/scenePlayer/scenePlayer.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT -->
   <script src="${appClientRoot}/vsl/velocity/velocity.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/scenes/app.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/scenes/scenes.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services/principalProperties.js"></script>
   <script src="${appClientRoot}/vsl/velocity/app/directives.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/filters.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | UI -->
   <script src="${appClientRoot}/vsl/velocity/ui/audioTapStart/audioTapStart.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/popupModal/popupModal.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/student/navbar/navbar.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/copyright/copyright.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/inactivityModal/inactivityModal.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | VIEWS -->
   <script src="${appClientRoot}/vsl/velocity/views/common/privacyPolicy/privacyPolicy.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/views/common/submitBug/submitBug.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/views/common/termsOfUse/termsOfUse.js?${versionNumber}"></script>
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
         coreClientRoot:"${coreClientUrl}/",
         appApiRoot:"${appApiRoot}/",
         appClientRoot:"${appClientRoot}/",
         coreContentDns:"${coreContentDns}",
         coreLcSpecDns:"${coreLcSpecDns}",
         useType:"${useType}",
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

   <!-- =====vvvvv===================== DEBUG MODAL CODE [JAVASCRIPT] -->
   <script type="text/javascript">
      var cluster = "${cluster}";
      var showModal = true;
      //if (cluster.indexOf("prod") >= 0) showModal = false;

      function resetUser(adaptive) {
         if (showModal == false){
            return;
         }
         if (!confirm("Reset student data from the core and enlearn systems?")) {
            return;
         }
         var requestObj;
         if (!adaptive) {
            requestObj = {
               "method":"resetUser",
               "id": "" + Math.floor((Math.random() * 1000000000000)),
               "params":[{"userUuid" : null }]
            };
         } else {
            requestObj = {
               "method":"resetAdaptiveProgress",
               "id": "" + Math.floor((Math.random() * 1000000000000)),
               "params":[{"userUuid" : window.globals.userUuid }]
            };
         }
         var ajaxOpt = {
            accepts: { text: "application/json" },
            contentType: "application/json;charset=utf-8",
            type : "POST",
            url : '${coreUrl}/ws/UserService.json',
            dataType: "json",
            data : JSON.stringify( requestObj ),
            success : function( data, status, jqXHR ) {
               alert("success!");
               location.reload(true);
            },
            error : function( jqXHR, status, error ) {
               alert( 'failure: ' + jqXHR.responseText + '\n' + status + '\n' + error );
               $("body").css("cursor", "default");
            }
         };
         connectToCore( ajaxOpt );
      }

      function createNotification() {
         if (showModal == false){
            return;
         }
         alert("Coming soon!");
         if (1==1) return;
         if (!confirm("create notification for this student that will show up in the teacher dashboard?")) {
            return;
         }
         var requestObj = {
            "method":"putNotification",
            "id": "" + Math.floor((Math.random() * 1000000000000)),
            "params":[{}]
         };
         var ajaxOpt = {
            accepts: { text: "application/json" },
            contentType: "application/json;charset=utf-8",
            type : "POST",
            url : '${coreUrl}/ws/NotificationService.json',
            dataType: "json",
            data : JSON.stringify( requestObj ),
            success : function( data, status, jqXHR ) {
               alert("success!");
               location.reload(true);
            },
            error : function( jqXHR, status, error ) {
               alert( 'failure: ' + jqXHR.responseText + '\n' + status + '\n' + error );
               $("body").css("cursor", "default");
            }
         };
         connectToCore( ajaxOpt );
      }

      function connectToCore( ajaxOpt ) {
         var xDomain = { crossDomain: true, headers: {CSESSIONID: '${SESSIONUUID}'}, xhrFields: { withCredentials: true } };
         return $.ajax( $.extend( ajaxOpt, xDomain) );
      }

      function showDebugPanel(){
         document.getElementById("debugPanel").style.display= "block";
      }

      function populateLessonDropdown( lessonTypeUuid ) {
         $("#lesson").val("");
         $("#lesson").html('').attr('disabled', 'disabled');
         $.get( "/lessonDropdownList", { "lessonTypeUuid": lessonTypeUuid } ).done(function( data ) {
            $('#lesson').removeAttr('disabled');
            $.each(data, function(key, val){
               $("#lesson").append('<option value="' + val.uuid + '">' + val.resourceNameId + '</option>');
            });
         });
      }

      function setLessonType(){
         $("#lesson").val("");
         $("#selectLPForm").submit();
         return true;
      }

      function setLesson(){
         /*$("#lesson").val($("#selectedLesson option:selected").val());*/
         $("#selectLPForm").submit();
         return true;
      }

      $(document).ready(function(){
         $("#lessonType").change(function () {
            var lessonTypeUuid = $(this).find('option:selected').val();
            populateLessonDropdown( lessonTypeUuid );
         }).change();
      });

      function openStudentModal(evt){
         if (!showModal)
            return;
         if (evt) {
            if (evt.altKey && evt.shiftKey)
               if(allowCheat())
                  $("#modal").modal("show");
         } else {
            if(allowCheat())
               $("#modal").modal("show");
         }
      }

      function allowCheat(){
         if (window.location.host.indexOf("dev.")>-1 || window.location.host.indexOf("qa.")>-1) {
            return true;
         } else {
            return ("${useType}"=="DEV" || "${useType}"=="QA");
         }
         return false;
      }
   </script>
   <!-- =====^^^^^===================== DEBUG MODAL CODE [JAVASCRIPT] -->

   <!-- =====vvvvv===================== BOUNCING BUTTON [JAVASCRIPT] -->
   <script type="text/javascript">
      setInterval(function(){
         $(".jqbounce").animate({bottom: "-=10"},300,function(){
            $(".jqbounce").animate({bottom:"+=10"},300)
         });
      },700)
   </script>
   <!-- =====^^^^^===================== BOUNCING BUTTON [JAVASCRIPT] -->

</body>
</html>
<script>VSL.analytics("pageview");</script>
