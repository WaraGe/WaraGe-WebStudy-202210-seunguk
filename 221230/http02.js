const http = require('http');
const fs = require('fs');

http. createServer((req, res) => {
    fs.readFile('http.html', (err, data) => {
        if(err) {
            console.log(err);
        }else {
            res.writeHead(200, {'content-text':'text/html'});
            res.end(data);
        }
    })
}).listen(3000, () => {console.log('서버실행중')})