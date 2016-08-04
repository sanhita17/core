/* http://stackoverflow.com/questions/19305821/multiple-modals-overlay */
$(document).on('show.bs.modal', '.modal', function () {
    var zIndex = 1040 + (10 * $('.modal:visible').length);
    $(this).css('z-index', zIndex);
    setTimeout(function() {
        $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
    }, 0);
});

function shiftWizardStep(modalBody,shift){
    var activeTab = $(modalBody).children(".tab-content").children(".tab-pane.active");
    if(shift===1){
        var targetTab = $(activeTab).next(".tab-pane");
    } else {
        var targetTab = $(activeTab).prev(".tab-pane");
    }
    if(targetTab.length!==0){
        $(activeTab).toggleClass("active");
        $(targetTab).toggleClass("active");
    }
}