const fs = require('fs');
const data = "Hello Node.js!!";

fs.writeFile('text2.txt', data, 'utf-8', (err) => {
    if (err) {
        console.log("에러 발생");
    } else {
        console.log('저장완료 / 비동기식');
    }
});
//생성할 파일명, 작성할 문장, '인코딩', 오류가 났을때

fs.writeFileSync('text3.txt', data, 'utf-8');
console.log('저장완료 / 동기')