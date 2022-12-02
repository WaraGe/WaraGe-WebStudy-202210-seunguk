$(document).ready(function() {
    let menu = $('#top_menu > ul > li');
    let contents = $('#contents > div');

    menu.click(function() {
        let tg = $(this);
        let i = tg.index();
        console.log(i);

        let section = contents.eq(i);
        let tt = section.offset().top; //offset position    

        $('html,body').stop().animate({scrollTop:tt});
    });

    //스크롤 위치에 의해서 버튼의 스타일 변경
    $(window).scroll(function () {
        let sct = $(window).scrollTop();

        contents.each(function () {
            let tg = $(this); // 현제 each문에 의해 선택된 div
            let i = tg.index(); // 선택된 div의 인덱스값
            if (tg.offset().top <= sct) { // sct이 크다는것은 내려간다는 의미
                //현재 선택된 div의 top부분에 스크롤탑이랑 비교해서
                // 크기가 같은경우 버튼
                menu.removeClass('on');
                menu.eq(i).addClass('on');
            }
        })
    })
})