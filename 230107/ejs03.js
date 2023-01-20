const express = require('express');
const fs = require('fs');
// npm i ejs

const ejs = require('ejs');

const app = express();
const port = 3000;

const router = express.Router();

//외부로 각각 인크루드 할 파일 선언하는 방법
const header = fs.readFileSync('./header.ejs', 'utf-8');
const body = fs.readFileSync('./body.ejs', 'utf-8');

//router 연결 127.0.0.1:3000/about
router.route('/about').post((req, res) => { // 요청, 응답
    //file inject - 연결
    const html = ejs.render(header, {title:'매개변수로 전달된 제목입니다',
        content:ejs.render(body, {message: '매개변수로 전달된 텍스트 메세지 입니다.'}) }); // include된 파일을 저장할것임
    
        // const 객체명 = ejs.render(파일명, {속성: 속성값, 
        // 추가되는 객체명:ejs.render(파일명, {속성: 속성값}) });

        res.writeHead(200, {'content-type': 'text/html'});
    res.end(html)
})

app.use('/', router); // 라이터 정의

//예외처리
app.all(
    '*',(req, res) => {
        res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
    })

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중`);
})