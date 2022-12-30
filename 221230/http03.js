const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('node.png', (err, data) => {
        if(err) {
            console.log('파일이 존재하지 않습니다',err);
        }else {
            res.writeHead(200, {'content-type':'image/png'});
            res.end(data);
        }
    })
}).listen(3000, () => {
'이미지 서버 실행중'
})


http.createServer((req, res) => {
    fs.readFile('sunny.mp3', (err, data) => {
        if(err) {
            console.log('파일이 존재하지 않습니다',err);
        }else {
            res.writeHead(200, {'content-type':'audio/mp3'});
            res.end(data);
        }
    })
}).listen(3001, () => {
'사운드 서버 실행중'
})