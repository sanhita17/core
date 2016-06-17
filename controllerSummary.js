var myApp = angular.module('summaryApp',["ngAnimate","vsl.core.ui.spine"]).config(config);
 
myApp.controller('summaryCtrl',function($scope,$http,$timeout) {

  $scope.characterAssets = { 
    name:"sloth",
    skeleton: "NormalBehaviorsSkeleton" 
  };

  //... Fetch skills from api...
  fetchSkills();

  //... Watch for when the character is ready...
  $scope.$watch('character.canvasReady',playCharacterAnimation);

  //: fetchSkills
  function fetchSkills() {
    var mylocation = window.location.toString();
    var geturls = mylocation.split('?');
    var ids = geturls[1].split('&');
    var nodeuuid = ids[0].split('=')[1];
    var lpuuid = ids[1].split('=')[1];

    var credentials = {
      "jsonrpc": "2.0",
      "id": "123",
      "method": "getProblemSummary",
      "params": [{
        "learningPathNodeUuid": lpuuid,
        "nodeUuid": nodeuuid
      }]
    };

    $http.post('ws/ProblemService.json',credentials).success(function(data) {
      console.log(data);
      
      $scope.ctx = {
        skills: []
      };
      $scope.ctx.skills = data.result.skills;
        $scope.praiseTextArray = [
        "Hooray!",
        "You\'re ready to move to a new skill!", 
        "Yahoo! You completed a problem.", 
        "You\'re doing great!",  
        "You succeeded!", 
        "That was a brave effort trying new problems!", 
        "Your brain was working hard.",
        "All your hard work is paying off.",
        "Very nice job!, Let\'s see what you can do next.",
        "Well done.",
        "That was excellent work.",
        "Awesome job!",
        "You must feel good about doing such a great job.",
        "Right on!",
        "Great thinking!",
        "Wonderful work!",
        "You were right on top of that one.",
        "Beautiful job!",
        "Way to go!",
        "Sensational effort!"
      ];

      $scope.praiseTextWord = $scope.praiseTextArray[Math.floor(Math.random()*$scope.praiseTextArray.length)];
    
      
    }); 
  }
  //#

  
  //: playCharacterAnimation
  function playCharacterAnimation(nv) {
    if(nv) {
      $timeout(function() {
        $scope.character.playAnimationSequence([
          {"name":"l_standingbreathingwithclosedsmile","duration":1}
        ],false).then(function() {

          var randomAnimations = [
            "l_Dance_Clap",
            "L_Stand_FistPump",
            "l_dance_monkey"
          ];

          var _animation = randomAnimations[Math.floor(Math.random()*randomAnimations.length)];

          var seq = [
            {"name":_animation,"duration":3},
            {"name":"l_standingbreathingwithclosedsmile","iterations":-1}
          ];

          $scope.character.playAnimationSequence(seq,false);

        });
      },1000);
    }
  }
  //#

});

//: config
function config($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(["**"]);
  return;
  $sceDelegateProvider.resourceUrlWhitelist([
     "self",
     "*",
     /https?:\/\/[\w\.]+.voyagersopris.com\/.*/
  ]);
};
//#
