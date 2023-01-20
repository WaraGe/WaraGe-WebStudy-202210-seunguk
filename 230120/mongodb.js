const express = require('express');
const bodyParser = require('body-parser');
//npm i mongodb
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
const port = 3000;
app.use(bodyParser.urlencoded({extended:false})); // 입력된 내용을 분석해서 가져오기위한것

//mongodb 연결 객체
let database;
//mongodb 연결함수
function connectDB() {
    const databaseURL = "mongodb://127.0.0.1:27017"; // mongodb 프로토콜 SD
    MongoClient.connect(databaseURL, (err, db) => { // connect안에 연결할 프로토콜 주소가 필요함
        if(!err) {
            const tempdb = db.db('frontenddb2301'); // 접근하고자 하는 데이터베이스의 이름
            database = tempdb;
            console.log('mongodb 데이터 베이스 연결 성공');
        }else {
            console.log(err);
        }
    }) 
}

/*
1. 서버에 대한 예외처리
2. 데이터베이스에 연결여부에 대한 예외처리
3. 실행하는 함수에 대한 정상처리에 대한 예외처리

=> 라우터에서는 예외처리문만 작성하고 실제로 실행하는 부분은 함수로 불러 올 것
*/

//회원가입
//http://localhost:3000/member/register (post)
router.route('/member/register').post((req, res) => {
    console.log('/member/register 호출');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const age = req.body.age;
    const email = req.body.email;

    //회원정보 출력
    console.log(`userid: ${userid}`);
    console.log(`userpw: ${userpw}`);
    console.log(`username: ${username}`);
    console.log(`age: ${age}`);
    console.log(`email: ${email}`);

    //회원정보 저장
    if(database) { //데이터베이스가 생성되어 있다면
        joinMember(database, userid, userpw, username, age, email, (err, result) => { // 뒤에 있는 err,result의 값이 밑에 회원가입의  callback과 같음
            // 실행함수의 예외처리
            if(!err) {
                //함수실행하는데 있어서 에러는 발생 하지 않음 함수가 실행은 되었지만 실제로 값이 없어 저장이 안된 경우에 예외처리
                if(result.insertedCount > 0) {
                    res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.write('<p>※축하합니다※</p>');
                    res.write('<p>회원가입이 성공적으로 완료되었습니다</p>');
                    res.end();
                }else {
                    res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.write('<p>회원가입 실패(value값 오류가 발생하였습니다)</p>');
                    res.write('<p>다시 한번 시도해주세요</p>');
                    res.end();
                }
                
            }else {
                res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>회원가입 실패(value값 오류가 발생하였습니다)</p>');
                res.end();
            }
        })
    }else { // 데이터베이스가 생성이 안되있다면
        res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
        res.write('<h2>회원가입 실패</h2>');
        res.write('<p>회원가입 실패(데이터베이스가 생성이 안됬습니다)</p>');
        res.end();
    } 
})


//로그인
//http://localhost:3000/member/login (post)
router.route('/member/login').post((req, res) => {
    console.log('/member/login 호출');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid: ${userid}, userpw: ${userpw}`);

    if(database) {
        loginMember(database, userid, userpw, (err, result) => {
            if(!err) {
                if(result) {
                    console.dir(result); // result를 전달
                    //toarray를 사용했기 때문에 -> 반복문
                    const resultUserid = result[0].userid;
                    const resultUserpw = result[0].userpw;
                    const resultUsername = result[0].username;
                    const resultAge = result[0].age;
                    const resultEmail = result[0].email;

                    res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
                    res.write('<h2>로그인 성공</h2>');
                    res.write('<p>회원정보는 아래와 같습니다</p>');
                    res.write(`<p>${resultUserid}(${resultUsername})님 환영합니다`);
                    res.write(`<p>나이: ${resultAge}살 회원님`);
                    res.end();
                    
                }else {
                    res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>아이디와 비밀번호를 확인해주세요</p>');
                    res.end();
                }
            }else {
                res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>400 error</p>');
                res.end();
            }
        });
    }else {
        res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
        res.write('<h2>로그인 실패</h2>');
        res.write('<p>서버에 오류가 발생한 실패(데이터베이스에 값이 없습니다)</p>');
        res.end();
    }
})

//회원정보 수정
//http://localhost:3000/member/edit (post)

//회원정보 삭제
//http://localhost:3000/member/delete (post)


//-------------------------------------------------------//
//회원가입
const joinMember = function(database, userid, userpw, username, age, email, callback) { // callback(err, result) 두개의 값이 있음
    console.log('joinmember 호출');
    const members = database.collection('member'); //collection에 있는 member을 객체로 지정
    //members.insertMany() 컬렉션을 저장
    members.insertMany([{userid: userid,
                         userpw: userpw,
                         username: username,
                         age: age,
                         email: email}], (err, result) => {
            if(!err) {
                //insertMany() 객체가 저장이 되면 자동으로 발생하는 값이 있음
                //result.insertedCount: insertMany()가 실행될때 정상적으로 저장된 count발생
                if(result.insertedCount > 0) {
                    console.log(`사용자 document ${result.insertedCount}명 추가 되었음`);
                }else {
                    console.log(`사용자 document 추가되지 않음`);
                }
                callback(null, result);
                return;
            }else {
                console.log(err);
                callback(err, null);
            }
        });
}
// 로그인
const loginMember = function(database, userid, userpw, callback) {
    console.log('loginMember 호출');
    const members = database.collection('member');

    //toArray() 란 찾고자 하는 정보가 여러개 이므로 배열 속성을 선언
    members.find({userid: userid, userpw: userpw}).toArray((err, result) => {
        //find()는 여러개의 객체를 찾을수 있기 때문에 배열로 toArray()를 사용함
        if(!err) {
            if(result.length > 0) { // 1개이상 있다면
                console.log('사용자를 찾았습니다');
                callback(null, result);
            }else {
                console.log('일치하는 사용자가 없습니다');
                callback(null, null);
            }
            return;
        }else {
            console.log(err);
            callback(err, null);
        }
    })
}
// 정보 수정

// 회원 삭제

app.use("/", router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중...`);
    connectDB();
})