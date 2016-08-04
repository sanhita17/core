<%@ include file="../common/_taglibs.jsp"%>
<!DOCTYPE html>
<html  ng-app="app">
<head>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
   <title>Velocity®</title>

   <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro">

   <!-- =====vvvvv===================== CSS -->
   <link rel="stylesheet" type="text/css" href="../../../resources/css/error.css?${versionNumber}" media="screen" />
   <link rel="stylesheet" type="text/css" href="../../../resources/css/k5i.css?${versionNumber}" media="screen" />
   <!-- =====^^^^^===================== CSS -->

</head>

<body  ng-controller="ErrorController">
   <div class="popupbg">
      <div class="error-title"><span class="velocityError"></span></div>
      <div  class="modal-body"  style=" -webkit-user-select:all ;">
         <table border='0' style="height:100%; width: 800px; margin: auto;">
            <tr>
               <td width="50%" style="text-align: -webkit-right;">
                  <div class="errorSloth"></div>
               </td>
               <td>
                  <div class="popup-right-container">
                     <div class="title">Oops!</div>
                     <div class="message">The page you are looking for does not exist.</div>
                     <div>
                        <button class="btn btn-default return-button btn-close" ng-click="gotoHome()"><span>RETURN</span><span class="icon" style="margin-top:2px;"></span></button>
                     </div>
                     <div class="errorMsg">ERROR 404: PAGE NOT FOUND</div>
                  </div>
               </td>
            </tr>
         </table>
      </div>
   </div>
   <copyright access="S" no-terms-of-use></copyright>

   <!-- =====vvvvv===================== JAVASCRIPT -->
   <script src="../../../resources/js/jquery-2.1.1.js"></script>
   <script src="../../../resources/js/angular/angular.js"></script>
   <!-- CORE | BOWER_COMPONENTS --]
   <script src="${coreClientUrl}/bower_components/jquery-ui/jquery-ui.min.js"></script>
   <script src="${coreClientUrl}/bower_components/angular/angular.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-animate/angular-animate.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-cookies/angular-cookies.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-bootstrap/ui-bootstrap.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
   <script src="${coreClientUrl}/bower_components/oclazyload/dist/ocLazyLoad.js"></script>
   <script src="${coreClientUrl}/bower_components/angular-sanitize/angular-sanitize.js"></script>
   <!-- CORE_CLIENT --]
   <script src="${coreClientUrl}/vsl/vsl.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/angular.q.extended.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/angular.css.js?${versionNumber}"></script>
   <script src="${coreClientUrl}/vsl/core/core.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT --]
   <script src="${appClientRoot}/vsl/velocity/velocity.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/services.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/directives.js?${versionNumber}"></script>
   <script src="${appClientRoot}/vsl/velocity/app/filters.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | UI --]
   <script src="${appClientRoot}/client/vsl/velocity/ui/copyright/copyright.js?${versionNumber}"></script>
   <!-- K5I_ELA_CLIENT | VIEWS --]
   <script src="${appClientRoot}/client/vsl/velocity/views/common/privacyPolicy/privacyPolicy.js?${versionNumber}"></script>
   <script src="${appClientRoot}/client/vsl/velocity/views/common/termsOfUse/termsOfUse.js?${versionNumber}"></script>
   -->

   <script type="text/javascript">
      angular.module("app",[/*"vsl.velocity.ui.copyright"*/]);

      angular.module("app").controller('ErrorController',['$scope', function
         ($scope){
            $scope.gotoHome = function(){
               window.location.href = '/home';
            };
         }
      ]);
   </script>
   <!-- =====vvvvv===================== JAVASCRIPT -->

   <!-- =====vvvvv===================== GLOBAL VARIABLES -->
   <script type="text/javascript">
      window.globals={
         appClientRoot:"${appClientRoot}/",
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