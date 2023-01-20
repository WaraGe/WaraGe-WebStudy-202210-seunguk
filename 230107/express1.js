const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const router = express.Router();
app.use(bodyParser.urlencoded({extended: false}));
// 서버의 패키지에 라우터라는 기능을 추가한것

// 라우터 객체 선언 https://localhost:3000/member/login -> post
router.route('/member/login').post((req, res) => {
    console.log('/member/login 호출')
});

// 라우터 객체 선언 https://localhost:3000/member/register -> post
router.route('/member/register').post((req, res) => {
    console.log('/member/register 호출')
});

// 라우터 객체 선언 https://localhost:3000/member/about -> get
router.route('/member/about').get((req, res) => {
    console.log('/member/about 호출')
});



app.use('/', router); // express내에서 router객체를 정의

app.all('*', (req, res) => { // 모든 요소에 요청과 응답을 찾을수 없을때 표시할 문장
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중`);
});