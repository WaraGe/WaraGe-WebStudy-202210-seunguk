$(document).ready(function () {
    
    $('.submn').hide(); //서브메뉴 숨김

    // $('#mmn').mouseenter(function() {
    //     $('.submn').slideDown();
    // });

    // $('#mmn').mouseleave(function() {
    //     $('.submn').slideUp();
    // });

    $('.mainmn > li').hover(
        function () {
            $(this).find('.submn').show();
            $(this).addClass('on');
        },
        function () {
            $(this).find('.submn').hide();
            $(this).removeClass('on');
        }
    )

    $('.submn li').mouseover(function () {
        // $(this).addClass('on');
        $(this).find('.submn').slideDown();
    });
    $('.submn li').mouseout(function () {
        // $(this).removeClass('on');
        $(this).find('.submn').slideUp();
    });

    let current = 0;
    let i = 1;
    let autoTime;

    timer();

    function timer() {
        autoTime = setInterval(function() {
            i = current + 1;
            if ( i == 3) {
                i = 0;
            }
            movie(i);
        }, 1000)
    }
    
    function movie(i) {
        console.log(current);
        console.log(i);
        currentEl = $('#viewer li').eq(current);
        nextEl = $('#viewer li').eq(i);

        currentEl.css({left : '0%'}).animate({left : '-100%'});
        nextEl.css({left : '100%'}).animate({left : '0%'});

        current = i;
    }    
})
