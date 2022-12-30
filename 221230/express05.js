//body-parser
const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const port = 3006;

// body-parser를 이용해서  application/x-www-form-unlencoded 파싱
// http://localhost:3006/?userid=apple&userpw=1111
// 전송방식이 get이 아니기 대문에 데이터를 받을수 없음

app.use(bodyparser.urlencoded(
    {
        extended : false // 파싱 방지를 위하여 입력
    }
    )); 
app.use((req, res) => {
    const paramId = req.body.userid; //post 방식으로 데이터 입력
    const paramPw = req.body.userpw;
    
    console.log(`paramId:${paramId}, paramPw:${paramPw}`); // 전달받을값 확인

    res.writeHead(200, {'context-type':'text/html; charset:utf-8'});
    res.write('<h2>익스프레스05 서버에서 응답하는 메시지 호출</h2>');
    res.write(`<p>아이디:${paramId}</p>`);
    res.write(`<p>비밀번호:${paramPw}</p>`);
    res.end();
});
app.listen(port, console.log(`${port} 포트로 서버를 실행중입니다..`));