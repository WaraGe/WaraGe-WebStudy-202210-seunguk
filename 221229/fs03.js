const fs = require('fs');

fs.readFile('text11.txt', 'utf-8', (err, data) => {
    // 동기식은 제어문 필수
    // 비동기식은 제어문 필수가 필요가 없음
    if(err) {
        console.log('에러발생! / 비동기');
    }else {
        console.log(data);
    }
});

// 동기식으로 
try {
    const text = fs.readFileSync('text11.txt', 'utf-8');
    console.log(`동기식으로 읽음 : ${text}`);
}catch (e) {
    console.log('에러발생! / 동기');
}

console.log('프로그램 종료');