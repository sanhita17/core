encapsulatedScript(function($localPath) {

  var css = angular.css(
    "vsl.core.ui.velocityTransition",
    VSL.versionedUrl($localPath.combineUrls("velocityTransition.css"))
  );

  angular.module('vsl.core.ui.velocityTransition',["ngAnimate","angular.css","vsl.core.ui.audioPlayer","vsl.core.ui.spine"])
    .directive('velocityTransition',function($timeout,TransitionSvc) {
      return {
        scope:{
          context:"=scopeKey"
        },
        replace: true,
        restrict: 'E',
        templateUrl: $localPath.combineUrls('velocityTransition.html'),
        css: css,
        link: function(scope,element,attr) {
          
          scope.$on('TRANSITION.data',function(event,obj) {
            if(obj.state == 'onStart') {
              TransitionSvc.init(scope,obj);
            }
            else {
              TransitionSvc.complete(scope,obj);
            }
          });
        }
      }
    })
    .service('TransitionSvc',['$q','$http','vsl.velocity.problemService','$interval','$timeout',"vsl.core.ui.audioPlayer",function($q,$http,problemService,$interval,$timeout,audioPlayer) {
      
      var _masterDefer = $q.defer();
      var completeDefer = $q.defer();
      var _completeDefer = $q.defer();
      var _initDefer = $q.defer();
      var _lessonType;
      var transitionOBJ = {
        "PROCEDURAL": proceduralLesson,
        "RECALL": recallLesson
      }
      var sidePanelCharacter = document.getElementsByClassName("vsl_core_ui_sidePanel-sidepanel-spine-Character");
      var transitionCharacter = document.getElementsByClassName("animac");
      var transitionsEnabled=true;

      function setEnabled(value){
         transitionsEnabled=value;
      }
      //:onStart
      function onStart($scope) {
        console.log('THIS IS THE START OF THE LESSON!!!!!');

        if(!transitionsEnabled || isPlacementTest($scope)) {
          _masterDefer.resolve();
        } 
        else {

          if($scope.lc.options.sidePanel) {
            accessToSidePanelCharacter($scope);  
          }

          $scope.$broadcast('TRANSITION.data',{
            state:"onStart",
            lessonType:$scope.lc.lessonType,
            lastCompLessonType: $scope.lastCompLessonType,
            learningPathNodeUuid: $scope.lpn.pathUuid,
            nodeUuid: $scope.lpn.nodeUuid,
            skillNameID: $scope.lc.skills[0].tagNameId ? $scope.lc.skills[0].tagNameId : null,
            ctx: $scope.ctx,
            sidePanelShown: $scope.lc.options.sidePanel
          });

        }

        return _masterDefer.promise;
      }
      //#

      //:onComplete
      function onComplete($scope) {

        console.log('THIS IS THE END OF THE LESSON!!!!!');

        if(!transitionsEnabled || isPlacementTest($scope)) {
          completeDefer.resolve();
        }
        else {

          $scope.$broadcast('TRANSITION.data',{
            state:"onComplete",
            lessonType:$scope.lc.lessonType,
            lastCompLessonType: $scope.lastCompLessonType,
            learningPathNodeUuid: $scope.lpn.uuid,
            nodeUuid: $scope.lpn.nodeUuid,
            scores: $scope.ctx.scores,
            ctx: $scope.ctx,
            skillNameID: $scope.lc.skills[0].tagNameId ? $scope.lc.skills[0].tagNameId : null,
            sidePanelShown: $scope.lc.options.sidePanel
          });

        }

        return completeDefer.promise;
      }
      //#

      //: accessToSidePanelCharacter
      function accessToSidePanelCharacter($scope) {
        //console.log('SIDE PANEL CHARACTER',$scope.transitionGetSidePanel().sidePanelCharacter);
      }
      //#


      //:onCompleteSequence
      function onCompleteSequence(scope) {
        var d = $q.defer();

        if(sidePanelCharacter.length) {

          //: ->SEQUENCE<-
          $q.sequence([
            function(next){
              resetTransitionCharacter(scope).then(next,next);
            },
            function(next) {
              animationWhileTalkingAudio2(scope).then(next,next);
            }
          ]).then(function() {
            d.resolve();
          });

        }
        else {

          scope.ANIMAC.data.changeAnimation('l_walkR',false,-1,null);

          $q.sequence([
            1500,
            function(next) {
              walkOnScreen(scope,'onComplete').then(next,next);
            },
            1000
          ]).then(function() {
            d.resolve();
          })
        }   

        return d.promise;
      }
      //#

      //:init
      function init(scope,obj) {

        if(sidePanelCharacter.length) {
          sidePanelCharacter = angular.element(sidePanelCharacter);
          sidePanelCharacter.hide();
        }

        $q.all([getJSON()]).then(function(allData) {

          if(!allData[0]) {
            return;
          }
          
          scope.context = {
            transData: allData[0],
            ANIMAC: {
              name: "sloth",
              skeleton: "ActivitySkeleton",
              data: {}
            },
            activityIntroAudio: getActivityIntroAudio(allData[0].audioSequences.activities,obj.skillNameID),
            skillNameID: obj.skillNameID,
            sidePanelShown: obj.sidePanelShown
          };

          scope.$watch('context.ANIMAC.data.canvasReady',function(nv) {
            if(nv) {

              if(!transitionOBJ[obj.lessonType]) {
                _masterDefer.resolve();
              }
              else {
                transitionOBJ[obj.lessonType](scope.context,obj).then(function() {
                  _masterDefer.resolve('|--- TRANSITION END ---| ' + obj.lessonType);
                })
              }
            }
          });

        },function(error) {
          console.log('ERROR FETCHING Transition Data!',error)
        });
      }
      //#

      //:complete
      function complete(scope,obj) {

        //console.log('checking scope...',scope);
        //console.log('checking obj...',obj);

        //...If Lesson is RECALL, resolve promise immediately. No Transition.
        if(obj.lessonType === "RECALL") {
          completeDefer.resolve();
          return;
        }
        
        //...Must be refreshed or starting at the end of the lesson...
        if(obj.ctx.state === "SUBMITTED" && !scope.context) {
          getJSON().then(function(json) {
            scope.context = {
              transData: json,
              ANIMAC: {
                name: "sloth",
                skeleton: "ActivitySkeleton",
                data: {}
              },
              activityIntroAudio: getActivityIntroAudio(json.audioSequences.activities,obj.skillNameID),
              skillNameID: obj.skillNameID,
              sidePanelShown: obj.sidePanelShown
            }

            if(scope.context.sidePanelShown) {
              sidePanelCharacter = angular.element(sidePanelCharacter);
              sidePanelCharacter.hide();
            }
          
            scope.context.state = 'START';

            //...Get QOC Score here...
            scope.context.qoc = getQOCScore(obj.scores);

            scope.$watch('context.ANIMAC.data.canvasReady',function(nv) {
              if(nv) {

                onCompleteSequence(scope.context).then(function() {
                  console.log('COMPLETE TRANSITION DONE!');
                  completeDefer.resolve();
                });

              }
            });

          });
        }
        else {

          if(scope.context.sidePanelShown) {
            sidePanelCharacter = angular.element(sidePanelCharacter);
            sidePanelCharacter.hide();
          }
          
          scope.context.state = 'START';

          //...Get QOC Score here...
          scope.context.qoc = getQOCScore(obj.scores);

          scope.$watch('context.ANIMAC.data.canvasReady',function(nv) {
            if(nv) {

              onCompleteSequence(scope.context).then(function() {
                console.log('COMPLETE TRANSITION DONE!');
                completeDefer.resolve();
              });

            }
          });

        }

      }
      //#


      //: proceduralLesson
      function proceduralLesson(scope,obj) {
        var _proDefer = $q.defer();
        
        console.log('sidePanelShown?',scope.sidePanelShown);

        scope.state = "START";

        if(scope.sidePanelShown) {
          sidePanelCharacter = angular.element(sidePanelCharacter);
          sidePanelCharacter.hide();
        }

        console.log('....Change Animation');
        scope.ANIMAC.data.changeAnimation('l_walkR',false,-1,null);

        //: ->SEQUENCE<-
        $q.sequence([
          500,
          function(next) {
            walkOnScreen(scope,'onStart').then(next,next);
          },
          500
        ]).then(function() {    
         
          if(scope.sidePanelShown) {
            sidePanelCharacter.show();
          }

          scope.state = "COMPLETE";
          _proDefer.resolve();
        });

        return _proDefer.promise;
      }
      //#

      //: recallLesson
      function recallLesson(scope,obj) {

        var _recallDefer = $q.defer();

        //...If Last Lesson was RECALL, resolve promise immediately. No Transition.
        if(obj.lastCompLessonType === "RECALL") {
          _recallDefer.resolve();
          return _recallDefer.promise;
        }

        scope.state = 'START';

        resetTransitionCharacter(scope).then(function() {
          
          //: ->SEQUENCE<-
          $q.sequence([
            function(next) {
              console.log('Dash Popout of Ground...');
              scope.ANIMAC.data.changeAnimation('s_portal_popout',false,1,null).then(next,next);
            },
            function(next) {
              console.log('Play Intro Audio and run talking sequence....');
              runTalkingAnimation(scope);
              audioPlayer.play(getAudioFile(scope.transData.audioSequences.recallIntro.randomize()[0],'recall')).then(next,next);
            },
            function(next) {
              console.log('Dash Poput Back In Ground...');
              scope.ANIMAC.data.changeAnimation('s_portal_dropin',false,1,null).then(next,next);
            },
            function(next) {
              console.log('Resetting Character Back Off Screen...')
              resetTransitionCharacterOffScreen(scope).then(next,next);
            },
            500
          ]).then(function() {    
             scope.state = "COMPLETE";
            _recallDefer.resolve();
          });

        })  

        return _recallDefer.promise;
      }
      //#

      //:walkOnScreen
      function walkOnScreen(scope,state) {

        var wrDefer = $q.defer();
        var step = -250;
        var updateStep = function() {

          if(step >= -50) {
            $interval.cancel(promise);

            //: ->SEQUENCE<-
            $q.sequence([
              function(next) {
                console.log('...Walk On Screen...');
                var _wir = scope.transData.animatedSequences.walkInRight;
                scope.ANIMAC.data.playAnimationSequence(_wir).then(next,next);

                return 1500;
              },
              function(next) {
                console.log('...Play Animation While Talking...');

                if(state === "onStart") {
                  animationWhileTalkingAudio(scope).then(next,next);
                }
                else {
                  animationWhileTalkingAudio2(scope).then(next,next);
                }
              },
              500
            ]).then(function() {
              wrDefer.resolve();
            });


          }
          else {
            step = step + 5;
            transitionCharacter[0].style.transform = 'translate3d('+step+'px,0,0)';
          }
        };

        var promise = $interval(updateStep,30);

        return wrDefer.promise;
      }
      //#

      //:walkOffScreen
      function walkOffScreen(scope,state) {

        var wrDefer = $q.defer();
        
        $timeout(function() {
          wrDefer.resolve();
        },1000);

        return wrDefer.promise;
      }
      //#


      //:resetTransitionCharacter
      function resetTransitionCharacter(scope) {
        var d = $q.defer();

        //: ->SEQUENCE<-
        $q.sequence([,
          1000,
          function(next) {
            console.log('//...Make transition character visbibility hidden....');
            scope.makeHidden = true;
            next();
          },
          1000,
          function(next) {
            console.log('//...move (not animate) on screen');
            transitionCharacter[0].style.transform = "translate3d(-50px,0,0)";
            next();
          },
          1000,
          function(next) {
            console.log('//...Make transition character visible...');
            scope.makeHidden = false;
            next();
          }
        ]).then(function() {
          d.resolve();
        })

        return d.promise;
      }
      //#


      //:resetTransitionCharacterOffScreen
      function resetTransitionCharacterOffScreen(scope) {
        var d = $q.defer();

        //: ->SEQUENCE<-
        $q.sequence([,
          1000,
          function(next) {
            console.log('//...Make transition character visbibility hidden....');
            scope.makeHidden = true;
            next();
          },
          1000,
          function(next) {
            console.log('//...move (not animate) on screen');
            transitionCharacter[0].style.transform = "translate3d(-250px,0,0)";
            next();
          },
          1000,
          function(next) {
            console.log('//...Make transition character visible...');
            scope.makeHidden = false;
            next();
          }
        ]).then(function() {
          d.resolve();
        })

        return d.promise;
      }
      //#

      //:runTalkingAnimation
      function runTalkingAnimation(scope) {
        scope.ANIMAC.data.playAnimationSequence(scope.transData.animatedSequences.talking).then(function() {
          runTalkingAnimation(scope);
        })
      }
      //#

      //:animationWhileTalkingAudio
      function animationWhileTalkingAudio(scope) {
        var d = $q.defer();

        runTalkingAnimation(scope);

        //: ->SEQUENCE<-
        $q.sequence(
          function(next) {
            
            var introAudioArr = [
              getAudioFile(scope.transData.audioSequences.newProceduralInto.randomize()[0]),
              getAudioFile(scope.activityIntroAudio)
            ];

            audioPlayer.play(introAudioArr).then(next,next);
          },
          500
        ).then(function() {
          scope.ANIMAC.data.changeAnimation('l_standingbreathingwithclosedsmile',false,-1,null);
          d.resolve();
        })

        return d.promise;
      }
      //#

      //:animationWhileTalkingAudio2
      function animationWhileTalkingAudio2(scope) {
        var d = $q.defer();

        runTalkingAnimation(scope);

        //:Check QOC SCORE....
        var qocScore = scope.qoc;
        var qocType = getQOCAnimationType(qocScore);

        //: ->SEQUENCE<-
        $q.sequence(
          function(next) {
            console.log('...Play Random Feedback Audio...');
            audioPlayer.play(getAudioFile(scope.transData.audioSequences.growthMindSet[qocType].randomize()[0],"feedback")).then(next,next);
          },
          function(next) {
            console.log('...RUN QOC Animation & Play SFX...');
            scope.ANIMAC.data.changeAnimation(scope.transData.animatedSequences.growthMindSet[qocType].randomize()[0].name,false,1,null);
            audioPlayer.play(getAudioFile(scope.transData.audioSequences.sfx,"sfx")).then(next,next);
          },
          function(next) {
            $timeout(function() {
              next();
            },500);
          },
          100
        ).then(function() {
          scope.ANIMAC.data.changeAnimation('l_standingbreathingwithclosedsmile',false,-1,null);
          d.resolve();
        })

        return d.promise;
      }
      //#

      //:getQOCAnimationType
      function getQOCAnimationType(qoc) {
        if(qoc >= 75) {
          return "positive";
        }
        else if(qoc >= 50 && qoc <= 75) {
          return "medium";
        }
        else if(qoc <= 50) {
          return "improvement";
        }
      }
      //#

      //:getQOCScore
      function getQOCScore(scores) {

        var foundQuality = null;
        var percentage = 0;

        angular.forEach(scores,function(score) {

          if(score.type === "quality") {
            foundQuality = score;
          }
        })

        if(foundQuality) {
          percentage = (foundQuality.value/foundQuality.maxValue) * 100;
        }

        return percentage;
      }
      //#

      //:getActivityIntroSkillAudio
      function getActivityIntroAudio(obj,skillNameID) {
        
        if( typeof(skillNameID) === 'undefined' || !obj[skillNameID]) {
          skillNameID = 'default';
        }

        return {name:obj[skillNameID]};
      }
      //#

      //:isPlacementTest
      function isPlacementTest($scope) {

        if($scope.lc.lessonType === "PROGRESS_CHECK") {
          return true;
        }

        return false;
      }
      //#

      //:getAudioFile
      function getAudioFile(obj,type) {

        if( type === 'recall') {
          return VSL.versionedUrl($localPath.combineUrls('../../resources/audio/transitions/recall/'+obj.name+'.mp3'));
        }
        if (type === 'sfx') {
          return VSL.versionedUrl($localPath.combineUrls('../../resources/audio/soundfx/'+obj.name+'.mp3'));
        }

        if(type === "feedback") {
          return VSL.versionedUrl($localPath.combineUrls('../../resources/audio/transitions/feedback/'+obj.name+'.mp3'));
        }
        else {
          if(!obj.name) {
            return VSL.versionedUrl($localPath.combineUrls('../../resources/audio/transitions/'+obj.audio+'.mp3')); 
          }
          
          return VSL.versionedUrl($localPath.combineUrls('../../resources/audio/transitions/'+obj.name+'.mp3'));  
        } 
      }
      //#

      //:getJSON
      function getJSON() {
        var deferred = $q.defer();

        $http.get(VSL.versionedUrl($localPath.combineUrls("velocityTransition.json"))).success(function(json) {
          deferred.resolve(json);
        });

        return deferred.promise;
      }
      //#


      
      //########## END OF TRANSITIONSVC ##########//
      //########## ##########//
      return {
        setEnabled:setEnabled,
        onStart: onStart,
        onComplete: onComplete,
        init: init,
        complete: complete
      }
      //########## ##########//
      //########## END OF TRANSITIONSVC ##########//
    }])
});