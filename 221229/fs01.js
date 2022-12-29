const fs = require('fs'); // 파일을 다루는 모듈

fs.readFile('text1.txt', 'utf-8', (err,data) => {
    //예외처리
    if (err) {
        console.log(err); // 오류가 난다면 err
    }else {
        console.log(`비 동기식으로 읽음 : ${data}`); // 오류가 나지 않는다면, 
    }
}); // text1번 파일을 읽어주고 utf-8로 인코딩 그리고 예외처리 하는 방법

//동기식
const text = fs.readFileSync('text1.txt', 'utf-8');
console.log(`동기식으로 읽음 : ${text}`);