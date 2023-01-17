const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.engine('html', require('ejs').renderFile); // ejs파일을 자동 렌더링 하기 위한 방법
app.use(bodyParser.urlencoded({ extends: false }));
//노드에서 문자분석을 하는 메소드는 두가지가 있음
//1. 충돌을 방지하기 위해 선언

const module1 = require('./router/module1')(app, fs);
// const module1 = require('./router/module1')
// 해당 노드 파일에 패키지를 사용할 수 있게 매개변수로 전달
app.listen(port,() => {
    console.log(`${port}번 포트로 서버 실행중`)
})