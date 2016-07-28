<%@ include file="../common/_taglibs.jsp"%>

<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta http-equiv="Cache-Control" content="no-cache"/>
  <META HTTP-EQUIV="Pragma" CONTENT="no-cache"/>
  <META HTTP-EQUIV="Expires" CONTENT="-1"/>
  <link href="../../../resources/css/k5i-prototype/app-base.css?${versionNumber}" rel="stylesheet" media="screen" />
  <link href="../../../resources/css/k5i-prototype/app-layout.css?${versionNumber}" rel="stylesheet" media="screen" />
  <link href="../../../resources/css/k5i-prototype/app-design.css?${versionNumber}" rel="stylesheet" media="screen" />
  <link href="../../../resources/css/k5i-prototype/app-plugins.css?${versionNumber}" rel="stylesheet" media="screen" />
  <script src="../../../resources/js/jquery-2.1.1.js"></script>
  <link href="../../../resources/css/bootstrap.min.css" rel="stylesheet" media="screen" />
  <script src="../../../resources/js/bootstrap.min.js"></script>
  

</head>
<body>
  <div class="stage home-bck">
    
    <div class="landing">
      <%@include file="../fragments/header.jsp" %>
    </div>

    <div class="summary-content">&nbsp;</div>
   
<div class="footer-start">&nbsp;</div>
    <div class="footer-legal">
      <span >&#169;<script type="text/javascript">document.write(new Date().getFullYear());</script> Voyager Sopris Learning Inc. All Rights Reserved.</span>
    </div> 

    <form class="hidden" id="form" method="post" action="/logout" ></form>
  </div>
  <!--#END .stage -->
</body>
</html>