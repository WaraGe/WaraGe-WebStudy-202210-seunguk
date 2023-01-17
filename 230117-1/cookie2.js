const express = require('express');
//npm i cookie-parser
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); //post
const fs = require('fs'); //html


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser('!@#$%^&*()_+')); // 암호화로 사용할 특수문자 기입

//http://localhost:3000/login
app.get('/login', (req, res) => {
    fs.readFile('login.html', 'utf-8', (err, data) => {
        if (!err) {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(data);
        } else {
            console.log(err);
        }
    })
})
//http://localhost:3000/loginok
app.post('/loginok', (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(userid); // 데이터 값 확인
    console.log(userpw);

    // admin // 1234 등등 아이디와 패스워드를 설정
    if(userid == 'admin' && userpw == '1234') {
        const expiresDay = new Date(Date.now() + (1000 * 60 * 60 * 24)); // 1day(24h)
        // 완료 날짜 new Date() => 현재날짜 --> new Data(현재날짜객체 + 특정시간)
        // 쿠키설정
        res.cookie('userid', userid, {expires: expiresDay, signed: true});
        console.log(expiresDay);
        res.redirect('/welcome'); // 로그인 성공시 실행할 라우터 객체
    }else {
        res.redirect('/fail'); // 로그인 실패시 실행할 라우터 객체
    }
})
//http://localhost:3000/welcome
app.get('/welcome', (req, res) => {
    const cookieUserid = req.signedCookies.userid;
    console.log(cookieUserid);
    if(cookieUserid) {
        fs.readFile('welcome.html', 'utf-8', (err, data) => {
            res.writeHead(200, {'content-type' : 'text/html'});
            res.end(data);
        });
    }else {
        res.redirect('/login');
    }
})
//http://localhost:3000/fail
app.get('/fail', (req, res) => {
    fs.readFile('fail.html', 'utf-8', (err, data) => {
        if(!err) {
            res.writeHead(400, {'content-type' : 'text/html'});
            res.end(data);
        }else {
            console.log(err);
        }
    })
})
// //http://localhost:3000/logout 내가한거
// app.get('/logout', (req, res) => {
//     fs.readFile('login.html', 'utf-8', (err, data) => {
//         if(!err) {
//             res.writeHead(200, {'content-type' : 'text/html'});
//             res.end(data);
//         }else {
//             console.log(err);
//         }
//     })
// })

//http://localhost:3000/logout 강사님이 하신거
app.get('/logout', (req, res) => {
    res.clearCookie('userid'); // 쿠키삭제
    res.redirect('/login'); // 경로로 나오기
})


app.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행중...`);
})