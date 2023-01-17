const express = require('express');
//npm i cookie-parser
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser()); //app의 미들웨어 함수

//쿠키생성함수
//http://127.0.0.1:3000/setCookie
app.get('/setcookie', (req, res) => {
    console.log('setCookie 호출');
    res.cookie('member', {
        id: 'apple',
        name: '김사과',
        gender: 'female'
    }, {
        maxAge: 1000 * 60 * 3 //만료 시간 설정
            //   초  * 분 * 시간
    });
    res.redirect('/showcookie')
});


app.get('/showcookie', (req, res) => {
    console.log('showCookie 호출');
    res.send(req.cookies);
    res.end();
});

app.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행중...`);
})