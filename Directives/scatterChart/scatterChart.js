encapsulatedScript(function($localPath) {
   function log() {
      console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.scatterChart",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.scatterChart",$localPath.combineUrls("scatterChart.css"), transitionTime);

   var module=angular.module("vsl.velocity.ui.scatterChart",[
   ]).run(function() {
      log("Module: vsl.velocity.ui.scatterChart");
   });

   google.load('visualization', '1', {packages:['corechart']});

   module.controller("scatterChartController",scatterChartController);

   scatterChartController.$inject=['$scope', '$timeout'];

   function scatterChartController($scope, $timeout) {
      log("Controller: vsl.velocity.ui.scatterChart");

      $timeout(function(){
         $scope.options={
            tooltip:{trigger:'none'},
            legend:'none',
            backgroundColor:'transparent',
            enableInteractivity:false,
            width: $scope.width,
            height: $scope.height,
            chartArea: {
               left: $scope.width*.125,
               top: $scope.height*.125,
               width: $scope.width-($scope.width*.175),
               height: $scope.height-($scope.height*.3)
            },
            annotations: {
               textStyle: {
                  fontSize: 11
               }
            },
            hAxis: {
               title: $scope.chartDetails.hAxis.title,
               textStyle: {
                  fontSize: 11
               },
               format: $scope.chartDetails.hAxis.format || null,
               gridlines: {
                  count: Math.ceil(($scope.chartDetails.dataPoints.length-1)/2)+2
               },
               minValue: 0,
               minorGridlines: {
                  count: 1
               },
               viewWindow: {
                  min: 0
               }
            },
            vAxis: {
               title:  $scope.chartDetails.vAxis.title,
               direction: 1,
               textStyle: {
                  fontSize: 11
               },
               format: $scope.chartDetails.vAxis.format || null,
               minValue: 0,
               minorGridlines: {
                  count: 1
               },
               viewWindow: {
                  min: 0
               }
            },
            series: [
               {color: '#3a63e1'}
            ]
         };

         $scope.data = google.visualization.arrayToDataTable($scope.chartDetails.dataPoints);

         google.charts.setOnLoadCallback(drawChart());
      },0);

      function drawChart(){
         log("\tdata:",$scope.chartDetails.dataPoints);
         log("\toptions:",$scope.options);

         var chart=new google.visualization.ScatterChart(document.getElementById("scatterChart"));
         chart.draw($scope.data,$scope.options);
         $scope.uiReady = true;
      }

      return;
   }

   module.service("scatterChartService",scatterChartService);

   scatterChartService.$inject=['$q'];

   function scatterChartService($q){
      log("Service: vsl.velocity.ui.scatterChart");

      return;
   }

   module.directive("scatterChart",scatterChart);

   scatterChart.$inject=['$timeout'];

   function scatterChart($timeout) {
      log("Directive: vsl.velocity.ui.scatterChart");

      return {
         restrict: "E",
         templateUrl: $localPath.combineUrls("scatterChart.html"),
         controller: scatterChartController,
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.scatterChart");

         $scope.element = element[0];
         $scope.width = element.parent().width();
         $scope.height = element.parent().height();

         log("\twidth:",$scope.width);
         log("\theight:",$scope.height);
         log("\tchartDetails:",$scope.chartDetails);

         return;
      }

   }

});
