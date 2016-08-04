<%@ include file="../common/_taglibs.jsp"%>
<!DOCTYPE html>
<html>
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
   <link rel="stylesheet" type="text/css" href="../../../resources/css/k5i.css" media="screen" />
   <!-- K5I_ELA_CLIENT -->
   <link rel="stylesheet" type="text/css" href="${appClientRoot}/vsl/velocity/app.css?${versionNumber}">
   <!-- K5I_ELA_CLIENT | FONTS -->
   <link rel="stylesheet" type="text/css" href="${appClientRoot}/vsl/velocity/resources/fonts/fonts.css?${versionNumber}">
   <!-- =====^^^^^===================== CSS -->

</head>

<body ng-app="app">
   <div class="body-bg-image">
      <navbar></navbar>

      <!-- =====vvvvv===================== DEBUG MODAL CODE [HTML] -->
      <div id="modal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-lg" style="width:560px;">
            <div class="modal-content" style="width:560px;">
               <div id="debugPanel" style="margin:20px;padding:10px;background-color:rgba(0,0,0,.1);border-radius:4px;">
                  <div style="padding-bottom:10px;margin-bottom:10px;border-bottom:1px solid #ffffff;">
                     Welcome to the Velocity® Admin page!<br>You have successfully logged in.
                  </div>
                  <div style="margin-bottom:10px;">
                     <table>
                        <tr>
                           <td>User Login:&nbsp;</td>
                           <td>
                              <input type="text" id="resetUserLogin" name="resetUserLogin" />
                              <input type="button" onclick="resetUser();" value="Reset"/>
                              <input type="button" onclick="invalidateUser();" value="Invalidate"/>
                           </td>
                        </tr>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- =====^^^^^===================== DEBUG MODAL CODE [HTML] -->

      <copyright access="S"></copyright>
   </div>

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
   <script src="${coreClientUrl}/bower_components/oclazyload/dist/ocLazyLoad.js"></script>
   <script src="${coreClientUrl}/bower_components/ua-parser-js/dist/ua-parser.min.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-sanitize/angular-sanitize.js"></script>
   <!-- CORE_CLIENT -->
   <script src="${coreClientUrl}/vsl/vsl.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/angular.q.extended.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/angular.css.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/core.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/sis/sis.js?${versionNumber}"></script>
   <!-- CORE -->
   <!-- CORE_CLIENT | TOOLS -->
   <!-- K5I_ELA_CLIENT -->
   <script src="${appClientRoot}/vsl/velocity/velocity.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services/currentSelections.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services/principalProperties.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/directives.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | UI -->
   <script src="${appClientRoot}/vsl/velocity/ui/popupModal/popupModal.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/copyright/copyright.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/ui/nonStudent/navbar/navbar.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | VIEWS -->
   <script src="${appClientRoot}/vsl/velocity/views/common/privacyPolicy/privacyPolicy.js?${versionNumber}"></script>
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
         coreSisUrl:"${coreSisUrl}"+"/ws/",
         coreClientRoot:"${coreClientUrl}/",
         appApiRoot:"${appApiRoot}/",
         appClientRoot:"${appClientRoot}/",
         useType:"${useType}",
         coreContentDns:"${coreContentDns}",
         coreLcSpecDns:"${coreLcSpecDns}",
         csessionid:"${SESSIONUUID}",
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

   <!-- =====vvvvv===================== DEBUG MODAL CODE [JAVASCRIPT] ===== "D"+(C) CLICK -->
   <script type="text/javascript">
      $("#modal").modal("show");

      function resetUser() {
         if (!confirm("Reset student data from the core and enlearn systems?")) {
            return;
         }
         var requestObj = {
            "method":"resetUserAsAdmin",
            "id": "" + generateUuid(),
            "params":[{"userLogin" : $("#resetUserLogin").val() }]
         };
         var ajaxOpt = {
            accepts: { text: "application/json" },
            contentType: "application/json;charset=utf-8",
            type : "POST",
            url : '${coreUrl}/ws/UserService.json',
            dataType: "json",
            data : JSON.stringify( requestObj ),
            success : function( data, status, jqXHR ) {
               if (data.result.success) {
                  alert("success!");
               } else {
                  var msg = "failure";
                  if (data.result.messages && data.result.messages.length) {
                     msg += ": " + data.result.messages[0].message;
                  }
                  alert(msg);
               }
            },
            error : function( jqXHR, status, error ) {
               alert( 'failure: ' + jqXHR.responseText + '\n' + status + '\n' + error );
            }
         };
         connectToCore( ajaxOpt );
      }

      function invalidateUser() {
         if (!confirm("Invalidate all Lessons/Activities that are not complete from core only?")) {
            return;
         }
         var requestObj = {
            "method":"invalidateLearningPathNodes",
            "id": "" + generateUuid(),
            "params":[{"userLogin" : $("#resetUserLogin").val() }]
         };
         var ajaxOpt = {
            accepts: { text: "application/json" },
            contentType: "application/json;charset=utf-8",
            type : "POST",
            url : '${coreUrl}/ws/LearningPathService.json',
            dataType: "json",
            data : JSON.stringify( requestObj ),
            success : function( data, status, jqXHR ) {
               if (data.result.success) {
                  alert("success!");
               } else {
                  var msg = "failure";
                  if (data.result.messages && data.result.messages.length) {
                     msg += ": " + data.result.messages[0].message;
                  }
                  alert(msg);
               }
            },
            error : function( jqXHR, status, error ) {
               alert( 'failure: ' + jqXHR.responseText + '\n' + status + '\n' + error );
            }
         };
         connectToCore( ajaxOpt );
      }

      function connectToCore( ajaxOpt ) {
         var xDomain = { crossDomain: true, headers: {CSESSIONID: '${SESSIONUUID}'}, xhrFields: { withCredentials: true } };
         return $.ajax( $.extend( ajaxOpt, xDomain) );
      }

      function generateUuid( copyToClipboard ) {
         var uuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace( /x/g, function() {
            return (Math.floor( Math.random() * 16 )).toString( 16 );
         } );
         if( copyToClipboard )
            window.clipboardData.setData( "Text", uuid );
         return uuid;
      }
   </script>
   <!-- =====^^^^^===================== DEBUG MODAL CODE [JAVASCRIPT] ===== "D"+(C) CLICK -->

   <script>
      (function($localPath){
         angular.module("app",[
            "vsl.core",
            "vsl.velocity.app.directives",
            "vsl.velocity.ui.nonStudent.navbar",
            "vsl.velocity.ui.popupModal",
            "vsl.velocity.ui.copyright"
         ]);
      })(window.location.href);
   </script>

</body>
</html>
<script>VSL.analytics("pageview");</script>
