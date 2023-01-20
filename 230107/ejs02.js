const express = require('express');
const fs = require('fs');
// npm i ejs

const ejs = require('ejs');

const app = express();
const port = 3000;

const router = express.Router();

// 127.0.0.1:3000/login
router.route('/login').post((req, res) => {

    const userinfo = {userid: 'apple', userpw: '1234'};

    fs.readFile('./test2.ejs','utf8',(err, data) => {
        if(!err) { //error가 없다면
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(ejs.render(data, userinfo)); // ejs.렌더링이 있어야 대입이 가능
        }else { //error가 있다면
            console.log("error: " + err);
        }
    })
});

app.use('/', router); // 라이터 정의

//예외처리
app.all(
    '*',(req, res) => {
        res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
    })

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중`);
})