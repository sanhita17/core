$(document).ready(function(){
    $('[data-toggle="collapse"]').click(function(e) {
        $(e.target).toggleClass("tree-toggle-closed tree-toggle-open");
    });
});