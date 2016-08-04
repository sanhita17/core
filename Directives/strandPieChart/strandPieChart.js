encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.strandPieChart",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.strandPieChart",[
      $localPath.combineUrls("strandPieChart.css"),
      $localPath.combineUrls("../../resources/images/icons.css"),
      $localPath.combineUrls("../../resources/fonts/fonts.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.ui.strandPieChart",[
      "angular.css",
      "ui.bootstrap",
      "ui.bootstrap.tpls",
      "ui.bootstrap.position",
      "ui.bootstrap.bindHtml",
      "ui.bootstrap.popover",
      "vsl.velocity.app.service.currentSelections"
   ]).run(function() {
      log("Module: vsl.velocity.ui.strandPieChart");
   });

   google.load('visualization', '1', {packages:['corechart']});

   module.controller("strandPieChartController",strandPieChartController);

   strandPieChartController.$inject=['$scope', "$q", '$timeout', '$location', '$compile', 'temporaryStorage', "currentSelections"];

   function strandPieChartController($scope, $q, $timeout, $location, $compile, temporaryStorage, currentSelections) {
      log("Controller: vsl.velocity.ui.strandPieChart");

      $timeout(function(){
         google.charts.setOnLoadCallback(drawChart());
      },0);

      var options={
         tooltip:{trigger:'none'},
         legend:'none',
         backgroundColor:'transparent',
         enableInteractivity:false,
         height:40,
         width:30,
         chartArea:{left:'0%',top:'12.5%',width:'100%',height:'75%'},
         slices:{
            0:{color:'#9641b9'},
            1:{color:'#f7931e'},
            2:{color:'#39b54a'},
            3:{color:'#de3f18'}
         },
         pieSliceText:'none',
         pieSliceBorderColor:'transparent'
      };

      var data=google.visualization.arrayToDataTable([
         ['Strand','Percentage'],
         ['Comprehension (C)',$scope.data.timeOnTaskComprehension],
         ['Word Study (WS)',$scope.data.timeOnTaskWord],
         ['Language (L)',$scope.data.timeOnTaskLanguage],
         ['Foundational Skills (FS)',$scope.data.timeOnTaskFoundation]
      ]);

      function drawChart(){
         var chart=new google.visualization.PieChart(document.getElementById("piechart"+$scope.index));
         chart.draw(data,options);
         $scope.uiReady = true;
      }

      $scope.setLoading = function(){
         return "<span class=\""+css.expand("-icon -icon_loading")+"\"></span><span style=\"display:inline-block;vertical-align:middle;\">Loading...</span>";
      };

      $scope.getPieChartDetails = function(){
         log("\tFUNC --> getPieChartDetails()");

         $timeout(function(){
            $scope.populateDetails();
         },0);
      };

      $scope.populateDetails = function(){
         $timeout(function(){
            try {
               var popover=angular.element($scope.element.querySelector(".popover"));
               popover.addClass("spc");
               var popoverContent=angular.element($scope.element.querySelector(".popover-content"));
               var begWidth=popoverContent.width();
               var begLeft=popover.position().left;

               if (popover.attr("placement")=="top") {
                  popover.css({top:-37+"px"})
               }

               var largeOptions = options;
               largeOptions.height=160;
               largeOptions.width=135;
               largeOptions.chartArea={left:'0%',top:'0%',width:'100%',height:'100%'};
               largeOptions.pieSliceText='percentage';
               largeOptions.pieSliceTextStyle={color:'#ffffff',fontName:'SourceSansProReg',fontSize:12};

               var html=""+
                  "<div class=\""+css.expand("-details-title")+"\">Time Per Strand</div>\n"+
                  "<div class=\""+css.expand("-details-data")+"\">\n"+
                     "<span id=\"piechart"+$scope.index+"_large\"\n"+
                           " class=\"pie_chart_large\"\n"+
                           " data=\""+options.chartData+"\"\n"+
                           " title=\"\"\n"+
                           " width=\"120\"\n"+
                           " height=\"160\">\n"+
                     "</span>\n"+
                     "<span class=\""+css.expand("-key-data")+"\">\n"+
                        "<div class=\""+css.expand("-strand")+" violet\">Comprehension &mdash; "+($scope.data.timeOnTaskPercent.comprehension).toFixed(1)+"%</div>\n"+
                        "<div class=\""+css.expand("-strand")+" orange\">Word Study &mdash; "+($scope.data.timeOnTaskPercent.word).toFixed(1)+"%</div>\n"+
                        "<div class=\""+css.expand("-strand")+" green\">Language &mdash; "+($scope.data.timeOnTaskPercent.language).toFixed(1)+"%</div>\n"+
                        "<div class=\""+css.expand("-strand")+" red\">Foundational Skills &mdash; "+($scope.data.timeOnTaskPercent.foundation).toFixed(1)+"%</div>\n"+
                        "<button class=\""+css.expand("-btn")+"\" ng-click=\"viewReportClicked()\">VIEW REPORT</button>\n"+
                     "</span>\n"+
                  "</div>\n";

               var compiledHtml=$compile(html)($scope);
               popoverContent.html(compiledHtml);

               var endWidth=popoverContent.width();
               if (endWidth<begWidth) {
                  var offset=(begWidth-endWidth)/2;
                  popover.css({left:(begLeft+offset)+"px"});
               }
               if (endWidth>begWidth) {
                  var offset=(endWidth-begWidth)/2;
                  popover.css({left:(begLeft-offset)+"px"});
               }
               if (popover.attr("placement")=="top") {
                  var height=popoverContent.parent().height();
                  popover.css({top:((-1*height)+3)+"px"})
               }

               var popups=angular.element(document.querySelectorAll(".popover"));
               if (popups.length>0) {
                  //TODO: Disable interval to reload data...
                  $scope.$emit("vsl.velocity.ui.strandPieChart.popoverOpened");

                  var chart=new google.visualization.PieChart(document.getElementById("piechart"+$scope.index+"_large"));
                  chart.draw(data,largeOptions);

               }
            } catch(e) {}
         },500);
      };

      $scope.clickOutside = function(){
         log("\tFUNC --> clickOutside()");
         $scope.$emit("vsl.velocity.ui.strandPieChart.clickOutside",{index:$scope.index,type:$scope.type});
      };

      $scope.viewReportClicked = function(){
         log("\tFUNC --> viewReportClicked()");
         currentSelections.setSelectedStudent($scope.data.student);
         $location.path('/teacher/progress/studentRpt');
      };

      return;
   }

   module.service("strandPieChartService",strandPieChartService);

   strandPieChartService.$inject=['$q'];

   function strandPieChartService($q){
      log("Service: vsl.velocity.ui.strandPieChart");

      return;
   }

   module.directive("strandPieChart",strandPieChart);

   strandPieChart.$inject=['$timeout'];

   function strandPieChart($timeout) {
      log("Directive: vsl.velocity.ui.strandPieChart");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("strandPieChart.html"),
         controller: strandPieChartController,
         scope: {
            data: "=?data",
            index: "=?index"
         },
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.strandPieChart");

         $timeout(function(){
            $scope.element=element[0];
         },0);

         return;
      }

   }
});
