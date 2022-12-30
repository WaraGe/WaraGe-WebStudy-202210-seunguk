const http = require('http');

http.createServer((req, res) => { // 서버 만들기
    res.writeHead(200, {'content-type':'text/html'}); // 응답하려는 문서의 타입 설정
    res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>http Module Test</title></head><body style="background-color: deepskyblue;"><h2>http 모듈 테스트</h2><p>처음으로 실행하는 node.js http 서버</p></body></html>'); // 응답하고자 하는
}).listen(3000, () => { // 서버 상태표시
    console.log('서버 실행중')
})