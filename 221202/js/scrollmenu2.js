$(document).ready(function() {
    let menu = $('#top_menu > ul > li');
    let contents = $('#contents > div');
    let q_menu = $('#q_mn > ul > div')

    menu.click(function() {
        let tg = $(this);
        let i = tg.index();
        console.log(i);

        let section = contents.eq(i);
        let tt = section.offset().top; //offset position    
        

        $('html,body').stop().animate({scrollTop:tt});
    });

    q_menu.click(function() {
        let tg = $(this);
        let i = tg.index();
        console.log(i);

        let section = contents.eq(i);
        let tt = section.offset().top; //offset position    
        
        
        $('html,body').stop().animate({scrollTop:tt});
    });

    //스크롤 위치에 의해서 버튼의 스타일 변경
    $(window).scroll(function () {

        let sct = $(window).scrollTop() ;
        $('#q_mn').stop().animate({top:sct + 400 + "px"}, 0);

        contents.each(function () {
            let tg = $(this); 
            let i = tg.index(); 
            if (tg.offset().top <= sct) {
                menu.removeClass('on');
                q_menu.removeClass('on');
                menu.eq(i).addClass('on');
                q_menu.eq(i).addClass('on');
            }
        })
    })
})