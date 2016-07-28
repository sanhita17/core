<%@ include file="../common/_taglibs.jsp"%>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta http-equiv="Cache-Control" content="no-cache"/>
  <META HTTP-EQUIV="Pragma" CONTENT="no-cache"/>
  <META HTTP-EQUIV="Expires" CONTENT="-1"/>
  <link href="../../../resources/css/k5i-prototype/app-test.css" rel="stylesheet" media="screen" />
  <script src="../../../resources/js/jquery-2.1.1.js"></script>
  <script src="${coreClientUrl}/bower_components/angular/angular.js"></script>
  <script src="${coreClientUrl}/vsl/vsl.js?${versionNumber}"></script>
  <script src="${coreClientUrl}/vsl/angular.q.extended.js?${versionNumber}"></script>
  <script src="${coreClientUrl}/vsl/angular.css.js?${versionNumber}"></script>
  <script src="${coreClientUrl}/vsl/core/ui/uiSpine/src/spine.js?${versionNumber}"></script>
  <script src="${coreClientUrl}/vsl/core/ui/uiSpine/src/spine-canvas.js?${versionNumber}"></script>
  <script src="${coreClientUrl}/vsl/core/ui/uiSpine/uiSpine.js?${versionNumber}"></script>
</head>
<body ng-app="app">

  <spine-test></spine-test>

  <script>
  (function($localPath){
     angular.module("app",["vsl.core.ui.spine"])
     .config(config);
   
     function config($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist(["**"]);
      return;
      $sceDelegateProvider.resourceUrlWhitelist([
         "self",
         "*",
         /https?:\/\/[\w\.]+.voyagersopris.com\/.*/
      ]);
    };

  })(window.location.href);
  </script>

</body>
</html>
