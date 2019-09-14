$(window).bind('resize', function (e)
{
    console.log('window resized..');
    this.location.reload(false); /* false to get page from cache */
    /* true to fetch page from server */
});

function autoHeight() {
    var h = $(document).height() - $('body').height();
    var p = $('.page-footer.font-small.blue.pt-4').height();
    if (h > 0) {
        $('.page-footer.font-small.blue.pt-4').css({
            marginTop: h-50
        });
    }
}
$(window).on('load', autoHeight);

