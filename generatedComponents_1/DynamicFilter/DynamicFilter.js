$(function () {
    $('[data-name="dynamic-filter"]').keyup(function (e) {
        checkFilters();
    });
    $('.dropdown-toggle').click(function (e) {
        keepDropdownButtonHighlighted();
    });
    $('.dropdown-menu').click(function (e) {
        keepDropdownButtonHighlighted();
    });
    $('.dropdown-menu input').click(function (e) {
        keepDropdownButtonHighlighted();
        checkFilters();
        e.stopPropagation();
    });
    $('.dropdown-menu input').change(function (e) {
        keepDropdownButtonHighlighted();
        checkFilters();
        e.stopPropagation();
    });
    $('.dropdown-menu label').click(function (e) {
        keepDropdownButtonHighlighted();
        checkFilters();
        e.stopPropagation();
    });
    $('.filter-reset').click(function (e) {
        resetFilters();
    });

    $('.filter-reset').mousedown(function (e) {
        clickResetButton(true);
    });
    $('.filter-reset').mouseup(function (e) {
        clickResetButton(false);
    });

});
function checkFilters() {
    if (($(".dropdown-menu input:checkbox:checked").length > 0) || ($('[data-name="dynamic-filter"]').val().length > 0)) {
        filteredIcon(true);
    } else {
        filteredIcon(false);
    }
}
function keepDropdownButtonHighlighted() {
    $('.dropdown-toggle').addClass('selected');
}
function clickResetButton(clicked) {
    if (clicked) {
        $('.filter-reset').addClass('btn-clicked');
    } else {
        $('.filter-reset').removeClass('btn-clicked');
    }
}
function resetFilters() {
    deleteTextEntry();
    uncheckFilters();
    filteredIcon(false);
}
function deleteTextEntry() {
    $('[data-name="dynamic-filter"]').val('');
}
function uncheckFilters() {
    $('.dropdown-menu input[type=checkbox]').prop('checked', false);
}
function filteredIcon(show) {
    if (show) {
        $('.dynamic-filter-addon').animate({left: "-35px"});
        $('.dynamic-filter').addClass('filtered');
    } else {
        $('.dynamic-filter-addon').animate({left: "0"});
        $('.dynamic-filter').removeClass('filtered');
    }
}
