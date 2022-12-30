const express = require('express');
const app = express();
const port = 3002;

//localhost:3000 or 127.0.0.1:3000
app.get('/', (req, res) => {
    res.send('익스프레스 서버 테스트');
});
app.listen(port, () => {
    console.log(`${port} 포트로 서버를 실행중...`)
})