const express = require('express');
const app = express();
const port = 3004;

app.use((req, res) => {
    console.log('첫번째 미들웨어 실행');
    res.redirect('https://www.naver.com');
})
app.listen(port, console.log(`${port} 포트로 서버를 실행중입니다..`));