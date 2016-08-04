$( document ).ready(function() {
    $('.textareaWLimit').keyup(function() {
        var text_length = $(this).val().length;
        var text_remaining = 500 - text_length;
        
        $(this).closest(":has(.charLimit)").find('.charLimit').html(text_remaining + ' characters remaining');
    });
});