$(document).ready(function () {
    $(".popover-btn").popover({
        container: "body",
        trigger: "manual",
        placement: "bottom", //rem: auto bottom
        html: true,
        template: '<div class="popover omnimenu-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
        //title : '<span class="ilicon ilicon-close" onclick="$(this).parent().parent().popover(\'hide\')"></span>',
        viewport: "body",
        content: function () {
            return  $(this).next("div.popover-content").html();
        }}).click(function (e) {
        $(this).popover('show');

        //OLD Don't reposition popovers that have already been positioned
        //if (!$(".popover:last-of-type").hasClass('repod')) {

        //positioning code to line up popover flush left beneath the triggering button
        if ($(this).hasClass("popover-right")) {
            $(".popover:last-of-type").offset({left: $(this).offset().left - ($(".popover:last-of-type").width() - $(this).outerWidth(false))});//.left = $(this).offset().left;
        } else {
            $(".popover:last-of-type").offset({left: $(this).offset().left});
        }
        if ($(this).hasClass("popover-top")) {
            $(".popover:last-of-type").offset({top: $(this).offset().top});
        }

        //OLD add a class to show this popover has been positioned
//            $(".popover:last-of-type").addClass('repod');

        //OLD bind a function so that when the popover is closed it removes the repo class, so it will be properly positioned when it is reopened
//            $(".popover:last-of-type").bind('DOMSubtreeModified', function () {
//                $(this).removeClass('repod');
//            });
        //}
    });

    $(".popover-infobox-btn").popover({
        container: "body",
        trigger: "manual",
        placement: "bottom", //rem: auto bottom
        html: true,
        template: '<div class="popover infobox-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
        //title : '<span class="ilicon ilicon-close" onclick="$(this).parent().parent().popover(\'hide\')"></span>',
        viewport: "body",
        content: function () {
            return  $(this).next("div.popover-infobox-content").html();
        }}).click(function (e) {
            $(this).popover('show');
            $(".popover:last-of-type").offset({left: $(this).offset().left - ($(".popover .popover-content .infobox:last-of-type").outerWidth(false)-$(this).outerWidth(false)),top:($(this).offset().top+36)});//.left = $(this).offset().left;
    });
    
    //remove all popovers when window is resized
    $(window).resize(function () {
        $(".popover").remove();
    });

    //http://stackoverflow.com/questions/11703093/how-to-dismiss-a-twitter-bootstrap-popover-by-clicking-outside
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
});