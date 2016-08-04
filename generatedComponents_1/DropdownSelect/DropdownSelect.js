$(function(){
    $(".dropdown-select .dropdown-menu").on('click', 'li a', function(){
        $('.dropdown-select .dropdown-menu li > a').each(function() {
            $(this).removeClass('selected');
        });
        var selText = $(this).text();
        $(this).toggleClass('selected');
        $(this).parents('.dropdown-select').find('.dropdown-toggle > .dropdown-select-text').html(selText);
    });
    
    //set to default selected value if present
    $('.dropdown-select .dropdown-menu li > a').each(function() {
        if($(this).hasClass('selected')){
            $(this).parents('.dropdown-select').find('.dropdown-toggle > .dropdown-select-text').html($(this).text());
        }
    });
    
    //OLD CODE LEFTOVER FROM STYLEGUIDE
//    $('.dropdown-sharedwith').click(function (){
//        dropDownFixPosition($('button'),$('.dropdown-menu'));
//    });
//    function dropDownFixPosition(button,dropdown){
//        var swButton = $('.dropdown-sharedwith');
//        var dropDownTop = swButton.offset().top + swButton.outerHeight();
//        dropdown.css('top', dropDownTop + "px");
//        dropdown.css('left', + swButton.offset().left + "px");
//    }

});

