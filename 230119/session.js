const express = require('express'); // 서버기능패키지
const bodyParser = require('body-parser'); // 문서 body영역에 데이트 분석
const fs = require('fs'); // 파일을 읽거나 쓰기하는 패키지
//npm i express session 세션모듈 설치
const expressSession = require('express-session');

const app = express();
const port = 3000;

//body영역을 분석하는 모듈이 두가지 있는데 각각 모듈에 있는 메소드중 같은
//기능을 가진 메소드가 충돌해서 문제를 발생하는 것을 방지를 위해 설정
app.use(bodyParser.urlencoded({extended: false}));

//세션의 초기값 설정
app.use(expressSession({
    secret: "!@#$%^&*()_+",
    resave: false,
    saveUninitialized: true
}));

// http://localhost:3000/login
app.get('/login', (req, res) => { // get을 사용한 이유 : login.html파일을 가져와서 읽을거기 때문
    fs.readFile('login.html', 'utf-8', (err, data) => {
        if(!err) {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(data)
        }else {
            console.log(err);
        }
    });
})
// http://localhost:3000/loginOk
app.post('/loginok', (req, res) => {
    const userid = req.body.userid; 
    const userpw = req.body.userpw;
    // 요청한 body영역에 userid, pw의 이름을 가진 input에 value값 저장공간에 주입

    console.log(userid);
    console.log(userpw);

    //id = admin, pw = 1234로 설정
    if(userid == 'admin' && userpw == '1234') {
        req.session.member = {  // member은 변수로 아무거나 입력해도 상관이 없음(세션정보 생성)
            id: userid,
            password: userpw,
            isauth: true // session인증이 되어있는지 확인
        }
        res.redirect('/welcome');
    }else {
        res.redirect('/fail');
    }
})
// http://localhost:3000/welcome
app.get('/welcome', (req, res) => {
    if(req.session.member) {
        console.log(req.session.member); // 값이 전달이 잘됬을때
        fs.readFile('welcome.html', 'utf-8', (err, data) => {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(data);
        })
    }else {
        res.redirect('/login')
    }
})

// http://localhost:3000/fail
app.get('/fail', (req, res) => {
    fs.readFile('fail.html','utf-8', (err, data) => {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(data);
     })
})
// http://localhost:3000/logout
app.get('/logout', (req, res) => {
    fs.readFile('login.html','utf-8', (err, data) => {
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(data);
     })
})

//서버응답상태함수
app.listen(port,() => {
    console.log(`${port}번 포트로 서버 실행중`)
})