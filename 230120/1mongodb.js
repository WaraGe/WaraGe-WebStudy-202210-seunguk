const express = require('express');

const bodyParser = require('body-parser');

// npm i mongodb

const MongoClient = require('mongodb').MongoClient;

 

const app = express();

const router = express.Router();

 

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

 

//몽고디비 연결 객체

let database;

 

//mongodb연결함수

function connectDB() {

    const databaseURL = "mongodb://127.0.0.1:27017";//몽고디비 프로토콜

    MongoClient.connect(databaseURL, (err, db) => {

        if (!err) {

            const tempdb = db.db('frontenddb2301');//접근하고자 하는 데이터베스의 이름

            database = tempdb;

            console.log('mongodb 데이터베이스 연결 성공!');

        } else {

            console.log(err);

        }

    })

}





/*

1.서버에대한 예외처리

2.데이터베이스에 연결여부에 대한 예외처리

3.실행하는 함수에 정상처리에 대한 예외처리

 

=>라우터에서는 예외처리문만 작성하고 실제로 실행하는 부분은 콜백함수로 생성

*/

 

// 회원가입

// http://localhost:3000/member/regist (post)

router.route('/member/regist').post((req, res) => {

    console.log('/member/regist 호출!');

    const userid = req.body.userid;

    const userpw = req.body.userpw;

    const username = req.body.username;

    const age = req.body.age;

 

    console.log(`userid:${userid},userpw:${userpw},username:${username},age:${age}`);




    if (database) {//데이터베이스가 생성되었어 연결이 되었다면

        joinMemer(database, userid, userpw, username, age, (err, result) => {

            //실행함수의 예외처리

            if (!err) {//함수실행하는데 있었어 에러는 발생 하지않음

                //함수가 실행은 되었지만 실제로 값이 없어 저장이 안된 경우에 대한 예외처리

                if (result.insertedCount > 0) {

                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });

                    res.write('<h2>회원가입 성공</h2>');

                    res.write('<p>가입이 성공적으로 완료되었습니다.</p>');

                    res.end();

                } else {

                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });

                    res.write('<h2>회원가입 실패</h2>');

                    res.write('<p>가입이 실패되었습니다.</p>');

                    res.end();

                }

            } else {//함수에 에러가 발생했을때

                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });

                res.write('<h2>회원가입 실패</h2>');

                res.write('<p>오류가 발생했습니다.</p>');

                res.end();

            }

        })

    } else {//데이터베이스 연결실패시

        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });

        res.write('<h2>회원가입 실패</h2>');

        res.write('<p>오류가 발생했습니다.</p>');

        res.end();

    }

})





// 로그인

// http://localhost:3000/member/login (post)




// 정보 수정

// http://localhost:3000/member/edit (post)





// 회원 삭제

// http://localhost:3000/member/delete (post)






//-----------------------------------------------------------

// 회원가입

const joinMemer = function (database, userid, userpw, username, age, callback) {//callback(err,result)

    console.log('joinMember 호출!');

    const members = database.collection('member');//컬렉션 객체로 지정

    //members.insertMany()컬렉션을 저장

    members.insertMany([{ userid: userid, userpw: userpw, username: username, age: age }], (err, result) => {

        if (!err) {

            //insertMany() 객체가 저장이 되면 자동으로 발생하는 값이 있음

            //result.insertedCount:insertMany()가 실행할때 정상적으로 저장된 숫자가 발생

            if (result.insertedCount > 0) {

                console.log(`사용자 document ${result.insertedCount}명 추가 되었음!`);

            } else {

                console.log(`사용자 document 추가되지 않음!`);

            }

            callback(null, result);

            return;

        } else {

            console.log(err);

            callback(err, null)

        }

    })

}




// 로그인

 

// 정보 수정

 

// 회원 삭제







app.use("/", router);//라우터객체를 서버에서 사용한다고 정의

 

app.listen(port, () => {

    console.log(`${port}포트로 서버 동작중...`)

    connectDB();//데이터베이스를 연결하는 함수 호출

})