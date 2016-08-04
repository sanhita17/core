$(document).ready(function(){
    $('.live-support-tab').mouseover(function () {
        $('.ls-label').removeClass('hidden');
    });
    $('.live-support-tab').mouseout(function () {
        $('.ls-label').addClass('hidden');
    });
});