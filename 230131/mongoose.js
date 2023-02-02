const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
// npm i mongoose
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));

// 데이테 베이스 연결
let database; //데이터베이스 객체
let UserSchema; //스키마 객체
let UserModel; // 모델 객체

function connectDB(){
    const url = "mongodb://127.0.0.1:27017/frontenddb2301";
    console.log('데이터베이스 연결 시도중 ... ');

    mongoose.Promise = global.Promise;
    // mongoose Promise 객체를 global의 Promise 객체로 사용? Node 의 네이티브 Promise 사용
    // 프로미스 객체는 자바스크립트 비동기 처리에 사용되는 객체
    // 특정코드의 실행이 완료 될 때까지 가디리지 않고, 다음 코드를 먼저 수행하는 자바스크립트의 특성을 의미
    // 서버에서 받아온 데이터를 화면에 표시할때 사용
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
    database = mongoose.connection;
    //객체.on('가상이벤트', 이벤트가 발생했을때의 실행할 함수)
    database.on('error', console.error.bind(console, "mongoose 연결 실패!"));
    database.on('open', () => {
        console.log("DataBase Connected Successfully");
            // Schema Setting
        UserSchema = mongoose.Schema({ // 객체명 = mongodb.schema({ 객체명 })
            userid: String,
            userpw: String,
            username: String,
            gender: String
        });
        console.log('UserSchema created Successfully!');

        //가상의 함수를 생성 (list 생성시 사용)
        UserSchema.static('findAll', function(callback){
            return this.find({}, callback);
        });

        UserModel = mongoose.model('user', UserSchema); //mongoose에 user라는 collection 생성
        console.log('UserModel이 정의되었습니다.');
    });

}

// localhost:3000/user/register (post) 회원가입
router.route('/user/register').post((req, res) => {
    console.log("/user/register 경로 확인");
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const gender = req.body.gender;

    console.log(`userid:${userid}, userpw:${userpw}, username:${username}, gender:${gender}`);

    if(database){
        joinUser(database, userid, userpw, username, gender, (err, result) => {
            if(!err){
                if(result){
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>Member registration success</h2>');
                    res.end();
                }else{
                    res.writeHead('404', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>Member registration failed</h2>');
                    res.end();
                }
            }else{
                res.writeHead('500', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>Server Connected Failed, Try again</h2>');
                res.end();
            }
        });
    }else{
        res.writeHead('404', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>DataBase Connected Failed</h2>');
        res.end();
    }

});

// localhost:3000/user/login (post) 로그인
router.route('/user/login').post((req, res) => {
    console.log('/user/login 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid}, userpw:${userpw}`);

    if(database){
        loginUser(database, userid, userpw, (err, result) => {
            if(!err){
                if(result){
                    console.dir(result);
                    const username = result[0].username;
                    const gender = result[0].gender;
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write("<h2>Member login success</h2>");
                    res.write("<h2>회원정보 출력</h2>");
                    res.write(`<p>사용자 아이디 정보: ${userid}</p>`);
                    res.write(`<p>사용자 비밀번호 정보: ${userpw}</p>`);
                    res.write(`<p>사용자 이름 정보: ${username}</p>`);
                    res.write(`<p>사용자 성별 정보: ${gender}</p>`);
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>Member login failed</h2>');
                    res.end();
                }
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>Server Connected Failed, Try again</h2>');
                res.end();
            }
        });
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>DataBase Connected Failed</h2>');
        res.end();
    }

});


// localhost:3000/user/list (get) 회원 리스트 출력
router.route('/user/list').get((req, res) => {
    if(database){
        UserModel.findAll((err, result) => {//가상의 메소드 생성
            if(!err){
                if(result){
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원 리스트</h2>');
                    res.write('<div><ul>');//시작을 열고

                    for(let i=0; i<result.length; i++){
                        const userid = result[i].userid;
                        const username = result[i].username;
                        const gender = result[i].gender;

                        res.write(`<li>${i} : ${userid} / ${username} / ${gender}</li>`);
                    }
                    res.write('</ul></div>');//닫기
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                    res.write('<h2>회원 정보가 없습니다</h2>');
                    res.end();
                }
            }else{
                console.log('리스트 조회 실패');
            }
        })
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }
});




// -----------------------------------------------------------------------------

const joinUser = function(database, userid, userpw, username, gender, callback){
    console.log('joinUser 호출!');
    const users = new UserModel({userid:userid, userpw:userpw, username:username, gender:gender});

    users.save((err, result) => {
        if(!err){
            console.log('member document is has been added');
            callback(null, result);
            return;
        }
        callback(err, null);
    });
}

const loginUser = function(database, userid, userpw, callback){
    console.log('loginUser 호출!');

    UserModel.find({userid:userid, userpw:userpw}, (err, result) => {
        if(!err){
            if(result.length > 0){
                console.log('일치하는 사용자를 찾음');
                callback(null, result);
            }else{
                console.log('일치하는 사용자가 없음');
                callback(null, null);
            }
            return;
        }
        callback(err, null);
    });
}


app.use('/', router);

app.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행중...`);
    connectDB();
})