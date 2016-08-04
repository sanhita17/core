(function(appServer,coreServer){
   // STYLESHEETS
   document.write("<link rel=\'stylesheet\' type=\'text/css\' href=\'"+coreServer+"client/bower_components/bootstrap/dist/css/bootstrap.css\'>");
   document.write("<link rel=\'stylesheet\' type=\'text/css\' href=\'"+appServer+"client/vsl/velocity/app.css\'>");
   document.write("<link rel=\'stylesheet\' type=\'text/css\' href=\'"+appServer+"client/vsl/velocity/resources/fonts/fonts.css\'>");
   document.write("<link rel=\'stylesheet\' type=\'text/css\' href=\'"+appServer+"client/vsl/velocity/resources/images/icons.css\'>");
   document.write("<link rel=\'stylesheet\' type=\'text/css\' href=\'"+appServer+"client/vsl/velocity/ui/selectors/selectors.css\'>");
   // CORE
   document.write("<script src=\'"+coreServer+"client/bower_components/jquery/dist/jquery.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/bower_components/angular/angular.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/bower_components/angular-cookies/angular-cookies.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/bower_components/angular-animate/angular-animate.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/bower_components/angular-bootstrap/ui-bootstrap.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js\'></script>");
   // CORE_CLIENT
   document.write("<script src=\'"+coreServer+"client/vsl/vsl.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/vsl/angular.q.extended.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/vsl/angular.css.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/vsl/core/core.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/vsl/core/sis/sis.js\'></script>");
   document.write("<script src=\'"+coreServer+"client/vsl/core/ui/testLogin/testLogin.js\'></script>");
   // K5I_ELA_CLIENT
   document.write("<script src=\'"+appServer+"client/vsl/velocity/testApp.js\'></script>");
   document.write("<script src=\'"+appServer+"client/vsl/velocity/velocity.js\'></script>");
   document.write("<script src=\'"+appServer+"client/vsl/velocity/app/filters.js\'></script>");
   document.write("<script src=\'"+appServer+"client/vsl/velocity/app/services.js\'></script>");
   document.write("<script src=\'"+appServer+"client/vsl/velocity/app/services/currentSelections.js\'></script>");
   document.write("<script src=\'"+appServer+"client/vsl/velocity/app/services/principalProperties.js\'></script>");
   // K5I_ELA_CLIENT | UI
   document.write("<script src=\'"+appServer+"client/vsl/velocity/ui/selectors/reportTypeSelector/reportTypeSelector.js\'></script>");
   document.write("<script src=\'"+appServer+"client/vsl/velocity/ui/selectors/reportTypeSelector/app.js\'></script>");
})(window.globals.appServer,window.globals.coreServer);
