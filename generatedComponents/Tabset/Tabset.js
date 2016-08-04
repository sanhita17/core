$(document).ready(function () {
    clampTabsetTabs();
    resizeTabsetTabs();

    //hide all filters when switching tabs
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        $('.filter-caret').addClass('hide');
        $('.filter-box').addClass('hide');
        $(window).trigger('resize'); //resize all trees and such
    });
});

$(window).resize(function () {
    clampTabsetTabs();
    resizeTabsetTabs();
});

function clampTabsetTabs() {
    var navArr = document.getElementsByClassName('clamp-tab');
    for (i = 0; i < navArr.length; i++) {
        $(navArr[i])[0].innerHTML = navArr[i].getAttribute('data-original');
        $clamp(navArr[i], {clamp: 2});
    }
}

function resizeTabsetTabs() {
    var navArr = document.getElementsByClassName('clamp-tab');
    for (i = 0; i < navArr.length; i++) {
        var currHeight = parseInt($(navArr[i]).css('height').replace("px", ""));
        if (currHeight > 25) {
            $(navArr[i]).parent().css('padding-top', '0px');
        } else {
            $(navArr[i]).parent().css('padding-top', '20px');
        }
    }
}