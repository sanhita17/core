encapsulatedScript(function($localPath) {
   function log() {
      //console.log.apply(console,arguments);
   }

   log("Script: vsl.velocity.ui.strandStatus",$localPath);

   var transitionTime = 1;

   var css=angular.css("vsl.velocity.ui.strandStatus",[
      $localPath.combineUrls("strandStatus.css"),
      $localPath.combineUrls("../../resources/images/icons.css"),
      $localPath.combineUrls("../../resources/fonts/fonts.css")
   ], transitionTime);

   var module=angular.module("vsl.velocity.ui.strandStatus",[
      "angular.css",
      "ui.bootstrap",
      "ui.bootstrap.tpls",
      "ui.bootstrap.position",
      "ui.bootstrap.bindHtml",
      "ui.bootstrap.popover",
      "vsl.velocity"
   ]).run(function() {
      log("Module: vsl.velocity.ui.strandStatus");
   });

   module.controller("strandStatusController",strandStatusController);

   strandStatusController.$inject=['$scope', '$timeout', '$compile', 'strandStatusService'];

   function strandStatusController($scope, $timeout, $compile, strandStatusService) {
      log("Controller: vsl.velocity.ui.strandStatus");

      $scope.setLoading = function(){
         return "<span class=\""+css.expand("-icon -icon_loading")+"\"></span><span style=\"display:inline-block;vertical-align:middle;\">Loading...</span>";
      };

      $scope.getStrandDetails = function(){
         log("\tFUNC --> getStrandDetails()");

         strandStatusService.getCurrentActivityReport($scope.student.uuid).then(function(currentActivity){
            log("\tRESPONSE getCurrentActivityReport: ",currentActivity);
            if (currentActivity) {
               if (currentActivity.success) {
                  $scope.populateDetails(currentActivity.values[$scope.student.uuid]);
               } else {
                  //TODO: Handle failure response...
                  $scope.populateDetails();
               }
            } else {
               //TODO: Handle no response...
               $scope.populateDetails();
            }
         });
      };

      $scope.populateDetails = function(details){
         $timeout(function(){
            try {
               var popover=angular.element($scope.element.querySelector(".popover"));
               popover.addClass("ss");
               var popoverContent=angular.element($scope.element.querySelector(".popover-content"));
               var begWidth=popoverContent.width();
               var begLeft=popover.position().left;

               if (popover.attr("placement")=="top") {
                  popover.css({top:-37+"px"})
               }

               var html="";
               if (details) {
                  html+=""+
                     "<div class=\""+css.expand("-details-title")+"\">"+$scope.strand.replace(" Strand","")+"</div>\n"+
                     "<div class=\""+css.expand("-details-subtitle")+"\">Current Activity</div>\n"+
                     "<div class=\""+css.expand("-details-data")+"\">\n"+
                        "<div>"+$scope.details.activityName+"</div>\n"+
                     "</div>\n"+
                     "<div class=\""+css.expand("-details-subtitle")+"\">History</div>\n"+
                     "<div class=\""+css.expand("-details-data")+"\">\n";
                  var count=0;
                  for (var i=0; i<details.length; i++) {
                     var detail=details[i];
                     if (count>=3) break;
                     if (typeof(detail.completionDate)!="undefined" && detail.completionDate) {
                        if (count==0) {
                           html+="<div>Related Problems</div>\n<ul>\n";
                        }
                        html+="<li>"+detail.problemName+" &mdash; "+detail.qualityOfCorrectness+"%</li>\n";
                        count++;
                     }
                  }
                  if (count>0) {
                     html+="</ul>\n";
                  } else {
                     html+="<div>No Related Problems</div>\n";
                  }
                  html+="</div>\n"
               } else {
                  html+=""+
                     "<div class=\""+css.expand("-details-title")+"\">"+$scope.strand.replace(" Strand","")+"</div>\n"+
                     "<div class=\""+css.expand("-details-subtitle")+"\">Current Activity</div>\n"+
                     "<div class=\""+css.expand("-details-data")+"\">\n"+
                        "<div>"+$scope.details.activityName+"</div>\n"+
                     "</div>\n"+
                     "<div class=\""+css.expand("-details-subtitle")+"\">History</div>\n"+
                     "<div class=\""+css.expand("-details-data")+"\">\n"+
                        "<div>No History available at this time</div>\n"+
                     "</div>\n";
               }


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
                  $scope.$emit("vsl.velocity.ui.strandStatus.popoverOpened");
               }
            } catch(e) {}
         },500);
      };

      $scope.clickOutside = function(){
         log("\tFUNC --> clickOutside()");
         $scope.$emit("vsl.velocity.ui.strandStatus.clickOutside",{index:$scope.index,type:$scope.type});
      };

      return;
   }

   module.service("strandStatusService",strandStatusService);

   strandStatusService.$inject=['vsl.velocity.reportService', '$q'];

   function strandStatusService(reportService, $q){
      log("Service: vsl.velocity.ui.strandStatus");

      var service={};

      service.getCurrentActivityReport = function(uuid){
         var deferred = $q.defer();
         reportService.getCurrentActivityReport({
            "systemUserUuid":uuid
         }).success(function(data, status, header, config){
            deferred.resolve(data.result);
         });
         return deferred.promise;
      };

      return service;
   }

   module.directive("strandStatus",strandStatus);

   strandStatus.$inject=['$timeout'];

   function strandStatus($timeout) {
      log("Directive: vsl.velocity.ui.strandStatus");

      return {
         restrict: "E",
         transclude: true,
         templateUrl: $localPath.combineUrls("strandStatus.html"),
         controller: strandStatusController,
         scope: {
            strand: "=?strand",
            student: "=?student",
            details: "=?details",
            index: "=?index",
            type: "=?type",
            settings: "=?settings"
         },
         link: link,
         css: css
      };

      function link($scope, element, attributes) {
         log("Instance: vsl.velocity.ui.strandStatus");

         if ($scope.strand) log("\tSTRAND",$scope.strand);
         if ($scope.student) log("\tSTUDENT",$scope.student);
         if ($scope.details) log("\tDETAILS",$scope.details);
         if ($scope.index!=null) log("\tINDEX",$scope.index);
         if ($scope.settings) log("\tSETTINGS",$scope.settings);

         $timeout(function(){
            if (!$scope.settings) $scope.settings={};
            $scope.settings.shape="circle";

            if ($scope.strand && $scope.student && $scope.details) {
               var strandClass;
               switch ($scope.strand) {
                  case "Comprehension Strand":              strandClass="-comp"; break;
                  case "Vocabulary and Word Study Strand":  strandClass="-vows"; break;
                  case "Language Strand":                   strandClass="-lang"; break;
                  case "Foundational Skills Strand":        strandClass="-fosk"; break;
               }
               applyClassToElement(strandClass,"-element");

               var onGradeLevel = (($scope.details.activityGradeLevelId - $scope.details.gradeLevelId)>=0);

               if ($scope.strand==$scope.details.tagName) {
                  $scope.settings.isCurrent=true;
                  if (!$scope.details.qualityOfCorrectness)
                     $scope.details.qualityOfCorrectness=100; /* Per Polly/Slim: "Make it green until there's a reason to turn it red." */
                  if (!onGradeLevel) {
                     if ($scope.details.qualityOfCorrectness>=$scope.details.threshold) {
                        $scope.settings.bottom="green";
                     } else {
                        $scope.settings.bottom="red";
                     }
                  } else {
                     if ($scope.details.qualityOfCorrectness>=$scope.details.threshold) {
                        $scope.settings.top="green";
                     } else {
                        $scope.settings.top="red";
                     }
                  }
               } else {
                  $scope.settings.isCurrent=false;
                  if (!$scope.details.lastActiveDate) {
                     $scope.settings.color="grey";
                  } else {
                     $scope.settings.both="grey";
                  }
               }
               if ($scope.settings.color!="red" && $scope.settings.color!="green") {
                  if ($scope.index%2!=0) {
                     applyClassToElement("-even","-shape");
                  } else {
                     applyClassToElement("-odd","-shape");
                  }
               }
            }
            $scope.element = element[0];
            if ($scope.settings) {
               if ($scope.settings.shape)
                  applyClassToElement("-"+$scope.settings.shape,"-shape");
               if ($scope.settings.color)
                  applyClassToElement("-"+$scope.settings.color,"-shape");
               if ($scope.settings.both)
                  applyClassToElement("-both-"+$scope.settings.both,"-shape");
               if ($scope.settings.top && $scope.settings.bottom) {
                  if ($scope.settings.top==$scope.settings.bottom) {
                     applyClassToElement("-both-"+$scope.settings.top,"-shape");
                  } else {
                     applyClassToElement("-top-"+$scope.settings.top+"-bottom-"+$scope.settings.bottom,"-shape");
                  }
               } else if ($scope.settings.top) {
                  applyClassToElement("-top-"+$scope.settings.top,"-shape");
               } else if ($scope.settings.bottom) {
                  applyClassToElement("-bottom-"+$scope.settings.bottom,"-shape");
               }
            }
            $scope.uiReady = true;
         },0);

         function applyClassToElement(className,elementClassName) {
            $(element[0]).find("."+css.expand(elementClassName)).addClass(css.expand(className));
         }

         return;
      }

   }
});
