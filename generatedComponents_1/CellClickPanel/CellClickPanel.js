/**
 * Created by mmuhlmeyer on 12/10/15.
 */

$(document).ready(function () {

    $("[data-toggle=popover]").popover();
    $(".circlePop").popover({
        html : true,
        content: function() {
            return $('.cellClickPanel').html();
        }
    });

});