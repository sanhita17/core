$(document).ready(function(){
   $('[data-favorite="favorite"]').on('click', function () {
       $(this).toggleClass('favorite');
   });
});