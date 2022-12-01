$(document).ready(function() {
    let current = 0;
    let autoTime;
    timer();
    
    $('#btns> li').click(function() {
        let i = $(this).index();
        timer();
        movie(i);
    });

    function timer() {
        //setInterval(함수(),시간); -> 시간 간격으로 함수를 반복 실행
        //clearInterval(실행함수객체명) -> setInterval() 함수를 종료

        //setTimeout(함수(),시간); -> 해당 시간이 지나면 함수를 한번만 실행
        //clearTimeout(실행함수객체명)
        clearInterval(autoTime)
        autoTime = setInterval(function() {
            i = current + 1;
            if ( i == 4) {
                i = 0;
            }
            movie(i);
        },1000)
    }

    $('#slide').on({
        mouseover:function() {
            clearInterval(autoTime);
        },
        mouseout:function() {
            timer();
        }
    })

    function movie(i) {
        if(current != i) {
            console.log(i);
            currentEl = $('#viewer ul li').eq(current);
            nextEl = $('#viewer ul li').eq(i);
            currentEl.css({left : '0%'}).animate({left : '-100%'});
            nextEl.css({left: '100%'}).animate({left: '0%'});

            current = i;
            $('#btns> li').removeClass('on');
            $('#btns> li').eq(i).addClass('on');
        }

        return;
    }
    

});