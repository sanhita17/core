<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
    <html class="no-js" ng-app="programEnd">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Velocity</title>
        <link rel="stylesheet" href="../../../resources/css/bootstrap.min.css" />
        <!-- K5I CSS -->
        <link href="../../../resources/css/k5i.css?${versionNumber}" rel="stylesheet" media="screen" />
        <link href="../../../resources/css/k5i-prototype/summary.css?${versionNumber}" rel="stylesheet" media="screen" />
    </head>
    <body ng-controller="testCtrl" class="landing-bck-gradient-sloth">
      <%@include file="../fragments/header.jsp" %>
            <!--  <img id="conclusionImage" src="../../../resources/images/vel_startupBG-01.svg">  -->
             <div class="conclusion">
            <div class="sloth-position ">
            <ui-spine 
              ng-model="summaryCharacter" 
              full-scale="{{slothFullScale}}"
              name="sloth">
            </ui-spine>
        </div>
    </div>
        </div>
            <div class="logout-box logout-fade">
                <div style="margin-top: 9px;">
                    <div class="btn-user-two">
                        <div class="logout-user-text">
                            <span>${userFullName}</span>
                            <span class="logout-arrows glyphicon glyphicon-triangle-top"></span>
                            <span class="logout-arrows glyphicon glyphicon-triangle-bottom"></span>
                        </div>
                    </div>
                    <div>
                        <div class="center-bottom">
                            <a href="/logout" class="logout-log-text" onclick="$('#form').submit();">LOG OUT</a></div>
                    </div>
                </div>
            </div>
        </div>
        <form class="hidden" id="form" method="post" action="/logout"></form>
        <div class="next-button">
            <a href="lessons">
                <button class="btn-circle"></button>
            </a>
        </div>
        <div class="footer-legal">
            <span data-core-debug>&#169;<script type="text/javascript">document.write(new Date().getFullYear());</script> Voyager Sopris Learning Inc. All Rights Reserved.</span>
        </div>
        <script src="../../../resources/js/jquery-2.1.1.min.js"></script>
        <script src="../../../resources/js/angular/angular.js"></script>
        <script src="${coreClientUrl}/vsl/vsl.js?${versionNumber}"></script>
         <script src="${coreClientUrl}/vsl/angular.q.extended.js?${versionNumber}"></script>
         <script src="${coreClientUrl}/vsl/angular.css.js?${versionNumber}"></script>
        <script src="${coreClientUrl}/vsl/core/core.js?${versionNumber}"></script>
        <script src="${coreClientUrl}/vsl/core/ui/uiSpine/src/spine.js?${versionNumber}"></script>
        <script src="${coreClientUrl}/vsl/core/ui/uiSpine/src/spine-canvas.js?${versionNumber}"></script>
        <script src="${coreClientUrl}/vsl/core/ui/uiSpine/uiSpine.js?${versionNumber}"></script>
        <script>
        $(document).ready(function(){
            $(".home-header").css('height','50px');
            $(".conclusion").css('height',$(window).height()+'px');
            $(".sloth-position").css('padding-left',(($(window).width()/2)+10)+"px");
        })
        </script>
        <script>
(function($localPath){
   angular.module("programEnd",["vsl.core.ui.spine"])
    .controller('testCtrl',function($scope){
        $scope.slothFullScale = false;
        windowWidth = $(window).width();
        if(windowWidth > 2500){
            $scope.slothFullScale = true;
        }

        //...change animation....
        $scope.$watch('summaryCharacter.canvasReady',function(nv) {
            if(nv) {
                console.log('am i here....',$scope.summaryCharacter)

            var animationInterval =     setInterval(function(){
                    if($scope.summaryCharacter){
                        $scope.summaryCharacter.changeAnimation("L_Dance_Clap",false,-1);

                        setTimeout(function(){
                            $scope.summaryCharacter.changeAnimation("L_Dance_Monkey",false,-1);
                            setTimeout(function(){
                            $scope.summaryCharacter.changeAnimation("L_Stand_SmileOpen_heavyBreathe",false,-1);
                            clearInterval(animationInterval);
                            },4000)

                        },3000)
                    }
                    else{
                        console.log("character loading");

                    }

                },1000)

                
            }
        })
        //
   });
   angular.module('programEnd').config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['**']);
});
})(window.location.href);
</script>
    </body>
    </html>