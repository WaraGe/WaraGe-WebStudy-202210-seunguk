const express = require('express');
const app = express();
const port = 3005;

app.use((req, res) => {
    console.log('첫번째 미들웨어 실행');

    console.dir(req.header);
    const userAgent = req.header('User-Agent');
    console.log(userAgent);
    //userAgent 서버요청을 보냈을때 디바이스와 브라우저등의 사용자 소프트웨어의
    //식별정보를 담고 있는 req.header의 종류이고 임의로 수정될 수 없는 값이고,
    //보통은 서버요청시 에러가 발생했을때 요청을 보낸 사용자의 환경값을 알아보기 위해 사용한다

    //http://localhost:3000?userid=apple
    const paramName = req.query.userid; //GET방식으로 요청한 변수를 의미
    console.log(paramName);

    res.writeHead('200', {'content-type':'text/html;charset=utf-8'});
    res.write('<h2>익스프레스 서버에서 응답한 메세지 입니다 12000<h2>');
    res.write(`<p>User-Agent : ${userAgent}</p>`);
    res.write(`<p>paramName : ${paramName}</p>`);
    res.end();
    
});
app.listen(port, console.log(`${port} 포트로 서버를 실행중입니다..`));