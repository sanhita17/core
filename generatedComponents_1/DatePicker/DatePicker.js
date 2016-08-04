$(document).ready(function () {
    var $datepickers = $('input.has-datepicker');

    //bind datepicker to input
    $datepickers.each(function () {
        $(this).datepicker($(this).data());
    });

    //bind datepicker to the associated calender icon (inside <a> tag)
    $datepickers.next('a').on('click', function (e) {
        e.preventDefault();
        $(this).prev('.has-datepicker').datepicker('show');
    });

});