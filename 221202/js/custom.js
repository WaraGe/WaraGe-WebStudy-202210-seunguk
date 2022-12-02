$(document).ready(function () {

    var ht = $(window).height();
    $('#wrap > div').height(ht);
   
    $(window).on('resize', function () {
        var ht = $(window).height();
        $('#wrap > div').height(ht);
    });
    
    //���콺��
    $('#wrap > div').on('mousewheel', function (event, delta) {
        if (delta > 0) {
            var prev = $(this).prev().offset().top;
            $('html, body').stop().animate({ 'scrollTop': prev }, 1000, 'easeOutExpo');
        } else if (delta < 0) {
            var next = $(this).next().offset().top;
            $('html, body').stop().animate({ 'scrollTop': next }, 1000, 'easeOutExpo');
        }
    });

});//��

