/*
  During local testing, this file can be run on the client.
  During server testing, this file is executed on the server.

  The events are defined in the manifest.json
*/
/*
 * 
 */
/**
 * Called when a context is initialized.
 */
(function(api,clientApi) {
   return {
      init:init,
      submit:submit,
      done:done
   };
   function init(ctx,req,res,lc,lpn) {
      if (ctx.state==="INIT")
         if (ctx.adaptive && ctx.adaptive.continueLpn) {
            var oldCtx=api.getContext(ctx.adaptive.continueLpn);
            ctx.answerList=oldCtx.answerList;
            ctx.selectedIndex=oldCtx.selectedIndex;
            ctx.state="FEEDBACK";
            //ctx.numOfHintsPlayed = oldCtx.numOfHintsPlayed;
         }
         else
            ctx.state="STARTED";
            
   }
   function submit(ctx,req,res,lc,lpn) {
      // console.log(req);
      ctx.selectedIndex=req.selectedIndex;
      ctx.answerList=req.answerList;
      ctx.numOfHintsPlayed = req.numOfHintsPlayed;
      if (req.answerGiven)
         ctx.adaptive.answerGiven=true;
      if (ctx.selectedIndex>=0)
         ctx.answerList[ctx.selectedIndex].correct=ctx.answerList[ctx.selectedIndex].selector==( (lc && lc.tagMappings && lc.tagMappings.correct && lc.tagMappings.correct.tagNameId) ? lc.tagMappings.correct.tagNameId : "devcorrect");
      if (ctx.adaptive.answerGiven)
         ctx.state="SUBMITTED";
      else
         if (ctx.selectedIndex>=0 && ctx.answerList[ctx.selectedIndex].correct)
            ctx.state="FEEDBACK";
         else
            done(ctx,req,res,lc,lpn);
   }
   function done(ctx,req,res,lc,lpn) {
        // set the state to DONE
      ctx.state = "DONE";
      var scoreObj = { "value" : ctx.selectedIndex>=0 && ctx.answerList[ctx.selectedIndex].correct ? 1 : 0 ,"maxValue" : 1, "type" : "passfail"};
      var hintsObj = {"maxValue":1,"type":"hintcount","value":req.numOfHintsPlayed};
      ctx.scores = [scoreObj,hintsObj];
      clientApi.addAdaptiveScore(ctx,ctx.scores[0]);
      clientApi.addQualityOfCorrectnessScore(ctx,lc,"correctiveFeedback");
   }
   
})(VSLAPI,CLIENTAPI);
