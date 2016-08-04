encapsulatedScript(function($localPath) {
  function log() {
    //console.log.apply(console,arguments);
  }
  log("Script: vsl.core.lc.spec.sentenceCompletion  ",$localPath);
  angular
    .module("vsl.core.lc.spec.sentenceCompletion",[
       "vsl.core",
       "vsl.core.ui.audioPlayer",
       "vsl.core.ui.iconButton",
       "vsl.core.ui.radialProgressBar",
       "vsl.core.ui.nextButton",
       "vsl.core.ui.centered",
       "vsl.core.ui.standardButton"
    ])
    .run(function(){
      log("Module: vsl.core.lc.spec.sentenceCompletion");
    });
  var css = angular.css(
    'vsl.core.lc.spec.sentenceCompletion',
    VSL.versionedUrl($localPath.combineUrls('sentenceCompletion.css'))
  );
  angular.module("vsl.core.lc.spec.sentenceCompletion")
        .directive("vsl.core.lc.spec.sentenceCompletion",sentenceCompletionDirective);
  sentenceCompletionDirective.$inject=["$compile","$interval","vsl.core.skinService"];
  function sentenceCompletionDirective($compile,$interval,skinService) {
     return {
        controller:"vsl.core.lc.spec.sentenceCompletion",
        require:"^vsl.core.lc.spec.problemType",
        templateUrl:VSL.versionedUrl($localPath.combineUrls('sentenceCompletion.html')),
        css:css,
        link:link
     };
     function link(scope,element,attributes,problemType) {
        scope.curry.skinName=skinService.get();
        if (scope.curry.skinName)
           element.addClass(css.expand("-skin-"+scope.curry.skinName));
        else
           element.addClass(css.expand("-unskinned"));
        scope.problemType=problemType;
        scope.animateSelection=function(index,callback){
            log("event",event);
           var item=element.find(css.expand(".-option")).css({zIndex:1}).eq(index).find(css.expand(".-positioner"));
           var answerHolder=element.find(css.expand(".-answerHolder"));
           
           var itemPosition=item.position();
           var itemOffset=item.offset();
           var answerHolderOffset=answerHolder.offset();
           var offset={top:itemPosition.top+answerHolderOffset.top-itemOffset.top,left:itemPosition.left+answerHolderOffset.left-itemOffset.left,width:answerHolder.width()};
           
           item.animate(offset,500,function(){
              item.css({top:"",left:"",width:""});
              callback();
           });
        };
        scope.$watch("sentenceElements",function(newValue){
           if (scope.sentenceElements)
           {
              
              scope.sentenceElements.find("[data-tagSpan="+scope.correctId+"]").html("");
              var replaceMe=scope.sentenceElements.find("[data-tagId="+scope.correctId+"]");
              replaceMe.html(element.find("[name=replaceBoxTemplate]")[0].innerHTML.trim());
              element.find(css.expand(".-sentence")).html($compile(scope.sentenceElements)(scope));
              scope.sentenceElements=null;
           }
        });
     }
  }
     angular.module("vsl.core.lc.spec.sentenceCompletion")
           .controller("vsl.core.lc.spec.sentenceCompletion",sentenceCompletionController);
     sentenceCompletionController.$inject=['$scope',"$q","$timeout","vsl.core.lc.spec.utilities","vsl.core.lc.dimensions","vsl.core.ui.audioPlayer","vsl.core.wordService"];
     function sentenceCompletionController($scope,$q,$timeout,specUtilities,dimensions,audioPlayer,wordService) {
       $scope.events.init().success(function(ctx,response){

          var paragraphIndex = $scope.$eval("ctx.adaptive.scopeIndex");
          $scope.problemType.setScopeIndex(paragraphIndex);
          var loopContext=null;
          if (typeof(paragraphIndex)==="number")
            loopContext=$scope.problemType.getTaggedPassage().getListByTagName("paragraph",paragraphIndex)[0];
          var correctItem=$scope.problemType.getTaggedPassage().getListByTagName($scope.$eval("lc.tagMappings.correct.tagNameId")||"devcorrect",null,loopContext); 
          if (!$scope.ctx.answerList)
          {
             var distractorItem=$scope.problemType.getTaggedPassage().getListByTagName($scope.$eval("lc.tagMappings.distractors.tagNameId")||"devdistractor",null,loopContext);
             var tags=correctItem.concat(distractorItem);
             if (!$scope.$eval("lc.options.randomizeSelection"))
                $scope.problemType.getTaggedPassage().sortTagListByElementPosition(tags);
             $scope.ctx.answerList=cookList(tags);
             if ($scope.$eval("lc.options.randomizeSelection"))
                wordService.randomizeArray($scope.ctx.answerList,function(item){return item.text;});
          }
          $scope.correctId=correctItem[0].data.id;
          var firstStentence=$scope.problemType.getTaggedPassage().getListByTagName($scope.$eval("lc.tagMappings.sentence.tagNameId")||"contextSentence",null,loopContext)[0];
          $scope.sentenceElements=angular.element(firstStentence.getHtml());
          $scope.sentenceAudio=firstStentence.getMedia("audio",0);
          log($scope.sentenceAudio);

          $scope.initialized($scope.$eval("lc.options.layout")||"FULL");


          //synchWithState();
          //...setup Support For Hints played...
          specUtilities.setupSupportForHintsPlayed($scope);

          //...ON TRANSITION START...
          $scope.problemType.transitionOnStart().then(function() {
            console.log('init...TRANSITION DONE! G0! -->');
            synchWithState();
          });
          //#

       });
       $scope.clickedStandardButton = function(index){
        if($scope.ctx.state==="STARTED" || $scope.ctx.state==="SELECTED"){
         if (index!==$scope.ctx.selectedIndex && !$scope.ctx.answerList[index].used && ($scope.ctx.selectedIndex<0 || !$scope.ctx.answerList[$scope.ctx.selectedIndex].correct)){
            audioPlayer.playSFX($scope.problemType.getAsset('globalAssets.audio.sfxClick')['@url']);
            $scope.ctx.selectedIndex=index;
            $scope.ctx.state="SELECTED";
            if ($scope.zoomInAnswer)
               $scope.zoomInAnswer=$timeout.cancel($scope.zoomInAnswer);
            $scope.zoomInAnswer=$timeout(function(){
               $scope.zoomInAnswer=null;
            },1000);
         }
       }
       }    
       $scope.next = function() {
          if ($scope.ctx.state==='STARTED' || $scope.ctx.state==='SELECTED')
             return submit();
          if ($scope.ctx.state==='SUBMITTED')
             return done();
       }
       function submit(next){
          $scope.ctx.state='SUBMITTING';
          audioPlayer.stopAll();
          $scope.events.submit({selectedIndex:$scope.ctx.selectedIndex,answerList:angular.copy($scope.ctx.answerList),answerGiven:$scope.ctx.adaptive.answerGiven,numOfHintsPlayed:specUtilities.getNumOfHintsPlayed($scope)}).then(function(){
             synchWithState().then(next);
          });
       }
       function done(next){
          $scope.ctx.state='SUBMITTING';
          audioPlayer.stopAll();

          $scope.events.done({
            numOfHintsPlayed:specUtilities.getNumOfHintsPlayed($scope)
          }).then(function(){
            //...Reset Num Of Hints....
            specUtilities.resetNumOfHintsPlayed($scope);
            synchWithState().then(next);
          });
       }
       function synchWithState(fromFeedback){
          var defer=$q.defer();
          if ($scope.ctx.state==="STARTED") {
             $scope.ctx.selectedIndex=-1;
             var giveAnswer=dimensions.$anyOf($scope,"correctiveFeedback","ANSWER_PROVIDED");
             
             if (giveAnswer || fromFeedback)
                $scope.lc.prompt.audio.autoplay=false;
             if ($scope.lc.prompt.audio.autoplay) {
                $scope.problemType.getSidePanel().playSidePanelInstructionalAudio($scope.lc.prompt.audio).then(function(status) {
                   $scope.playSentence=true;
                });
              }
             else
             {
                $scope.problemType.getSidePanel().playSidePanelInstructionalAudio($scope.lc.prompt.audio);
                if (!giveAnswer && !fromFeedback)
                   $scope.playSentence=true;
             }
             var hintAudio = [];
             angular.forEach($scope.lc.adaptives, function(adaptive) {
                hintAudio.push(adaptive.audio);
             });
             $scope.problemType.getSidePanel().playSidePanelHintAudio(hintAudio);
             if (giveAnswer) {
                $scope.ctx.state="FEEDBACK";
                specUtilities.processFeedback($scope,"answerGiven",processFeedbackAction).then(defer.resolve);
             }
             else
                defer.resolve();
          }
          else if ($scope.ctx.state==="FEEDBACK") {
             function feedbackComplete(){
                $scope.ctx.state="STARTED";
                synchWithState(true).then(defer.resolve);
             }
             if ($scope.ctx.selectedIndex>=0 && $scope.ctx.answerList[$scope.ctx.selectedIndex].correct) {
                $scope.rightAnswerPicked=true;
                specUtilities.processFeedback($scope,"correct",processFeedbackAction).then(defer.resolve);
             }
             else
                if ($scope.ctx.selectedIndex>=0)
                   specUtilities.processFeedback($scope,"incorrectAnswer",processFeedbackAction).then(feedbackComplete);
                else
                   specUtilities.processFeedback($scope,"noAnswer",processFeedbackAction).then(feedbackComplete);
          }
          else
             defer.resolve();
          return defer.promise;
       }
       
       function processFeedbackAction(next,action){
          if (action==="combineSentence") {

             $scope.combineSentence=true;

              return $q.sequence(1000,next);
            
          }
          if (action==="submit") {
             return submit(next);
          }
          if (action==="done") {
             return done(next);
          }specUtilities
          if (action==="unselectOption") {
             $scope.ctx.selectedIndex=-1;
             return next();
          }
          if (action==="removeOption") {
             if ($scope.ctx.selectedIndex>=0)
             {
                $scope.ctx.answerList[$scope.ctx.selectedIndex].used=false;
                $scope.ctx.selectedIndex=-1;
             }
             return next();
          }
          if (action==="removeOneRandomIncorrect")
             return removeOneRandomIncorrect(next);
          if (action==="removeAllIncorrect")
             return removeAllIncorrect(next);
          if (action==="selectCorrect")
             return selectCorrect(next);
          next();
       }
       function removeOneRandomIncorrect(next) {
          var indeces=[];
          for (var i=0;i<$scope.ctx.answerList.length;i++)
             if (!$scope.ctx.answerList[i].used &&
                 $scope.ctx.answerList[i].selector!==$scope.lc.tagMappings.correct.tagNameId)
                indeces.push(i);
          if (indeces.length>0) {
             var index=indeces.random();
             $scope.ctx.answerList[index].used=true;
             if ($scope.ctx.selectedIndex===index)
                $scope.ctx.selectedIndex=-1;
          }
          next && next();
       }
       function removeAllIncorrect(next) {
          for (var i=0;i<$scope.ctx.answerList.length;i++)
             if ($scope.ctx.answerList[i].selector!==$scope.lc.tagMappings.correct.tagNameId) {
                $scope.ctx.answerList[i].used=true;
                if ($scope.ctx.selectedIndex===i)
                   $scope.ctx.selectedIndex=-1;
             }
          next && next();
       }
       function selectCorrect(callback) {
          angular.forEach($scope.ctx.answerList,function(answer,index) {
             if (answer.selector===$scope.lc.tagMappings.correct.tagNameId) {
                // make this item selected!!!
                $q.sequence(1,//delay start of sequence so angular has time to render
                 function(next){
                   if ($scope.animateSelection)
                      $scope.animateSelection(index,next);
                   else
                      next();
                },function(next){
                   $scope.ctx.adaptive.answerGiven=true;
                   $scope.ctx.selectedIndex=index;
                   $scope.ctx.answerList[$scope.ctx.selectedIndex].given=true;
                   callback();
                   next();
                });
             }
          });
       }
     }
     function cookList() {
        var cookedList=[];
        for (var i=0;i<arguments.length;i++)
        {
           var list=arguments[i];

           allOptionsContainsAudio = true;
           angular.forEach(list, function(item){
            if(!item.getMedia('audio')){
              allOptionsContainsAudio = false;
            }
           })
           for (var j=0;j<list.length;j++){
            getAudio = list[j].getMedia('audio');
            if(allOptionsContainsAudio && getAudio.uri["@url"]){
                cookedList.push({audio:{src:getAudio.uri["@url"]},text:list[j].getText(),selector:list[j].selector});    
            }
            else{
              cookedList.push({audio:null,text:list[j].getText(),selector:list[j].selector});    
            }       
       }
     }
       return cookedList;
    }

});