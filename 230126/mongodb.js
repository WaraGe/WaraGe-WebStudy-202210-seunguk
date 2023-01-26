const express = require("express");
const bodyParser = require("body-parser");
// npm i mongodb
const MongoClient = require("mongodb").MongoClient;

const app = express();
const router = express.Router();

const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));

//몽고디비 연결 객체
let database;

//mongodb연결함수
function connectDB() {
  const databaseURL = "mongodb://127.0.0.1:27017"; //몽고디비 프로토콜
  MongoClient.connect(databaseURL, (err, db) => {
    if (!err) {
      const tempdb = db.db("frontenddb2301"); //접근하고자 하는 데이터베스의 이름
      database = tempdb;
      console.log("mongodb 데이터베이스 연결 성공!");
    } else {
      console.log(err);
    }
  });
}

/*
1.서버에대한 예외처리
2.데이터베이스에 연결여부에 대한 예외처리
3.실행하는 함수에 정상처리에 대한 예외처리

=>라우터에서는 예외처리문만 작성하고 실제로 실행하는 부분은 콜백함수로 생성
*/

// 회원가입
// http://localhost:3000/member/regist (post)
router.route("/member/regist").post((req, res) => {
  console.log("/member/regist 호출!");
  const userid = req.body.userid;
  const userpw = req.body.userpw;
  const username = req.body.username;
  const age = req.body.age;

  console.log(
    `userid:${userid},userpw:${userpw},username:${username},age:${age}`
  );

  if (database) {
    //데이터베이스가 생성되었어 연결이 되었다면
    joinMember(database, userid, userpw, username, age, (err, result) => {
      //실행함수의 예외처리
      if (!err) {
        //함수실행하는데 있었어 에러는 발생 하지않음
        //함수가 실행은 되었지만 실제로 값이 없어 저장이 안된 경우에 대한 예외처리
        if (result.insertedCount > 0) {
          res.writeHead("200", { "content-type": "text/html;charset=utf-8" });
          res.write("<h2>회원가입 성공</h2>");
          res.write("<p>가입이 성공적으로 완료되었습니다.</p>");
          res.end();
        } else {
          res.writeHead("404", { "content-type": "text/html;charset=utf-8" });
          res.write("<h2>회원가입 실패</h2>");
          res.write("<p>가입이 실패되었습니다.</p>");
          res.end();
        }
      } else {
        //함수에 에러가 발생했을때
        res.writeHead("404", { "content-type": "text/html;charset=utf-8" });
        res.write("<h2>회원가입 실패</h2>");
        res.write("<p>오류가 발생했습니다.</p>");
        res.end();
      }
    });
  } else {
    //데이터베이스 연결실패시
    res.writeHead("404", { "content-type": "text/html;charset=utf-8" });
    res.write("<h2>회원가입 실패</h2>");
    res.write("<p>오류가 발생했습니다.</p>");
    res.end();
  }
});

// 로그인
// http://localhost:3000/member/login (post)
router.route("/member/login").post((req, res) => {
  console.log("/member/login 호출!");
  const userid = req.body.userid;
  const userpw = req.body.userpw;

  console.log(`userid:${userid}, userpw:${userpw}`);

  if (database) {
    loginMember(database, userid, userpw, (err, result) => {
      if (!err) {
        if (result) {
          console.dir(result); //전달을 의미
          //toArray()를 사용했기 때문에 ->반복문
          const resultUserid = result[0].userid;
          const resultUserpw = result[0].userpw;
          const resultName = result[0].username;
          const resultAge = result[0].age;

          //로그인이 되었을때 해당 정보를 화면에 출력
          res.writeHead("200", { "content-type": "text/html;charset=utf-8" });
          res.write("<h2>로그인 성공</h2>");
          res.write(`<p>${resultUserid}(${resultName})님 환영합니다.</p>`);
          res.write(`<p>나이 : ${resultAge}살</p>`);
          res.end();
        } else {
          res.writeHead("200", { "content-type": "text/html;charset=utf-8" });
          res.write("<h2>로그인 실패</h2>");
          res.write("<p>아이디 / 비밀번호 확인하세요</p>");
          res.end();
        }
      } else {
        res.writeHead("500", { "content-type": "text/html;charset=utf-8" });
        res.write("<h2>로그인 실패</h2>");
        res.write("<p>서버오류,,,로그인 실패</p>");
        res.end();
      }
    });
  } else {
    res.writeHead("300", { "content-type": "text/html;charset=utf-8" });
    res.write("<h2>로그인 실패</h2>");
    res.write("<p>데이터베이스 연결실패,,,로그인에 실패했습니다.</p>");
    res.end();
  }
});

// 정보 수정
// http://localhost:3000/member/edit (post)
router.route("/member/edit").post((req, res) => {
  console.log("/member/edit 호출!");

  const userid = req.body.userid;
  const userpw = req.body.userpw;
  const username = req.body.username;
  const age = req.body.age;

  console.log(
    `userid:${userid}, userpw:${userpw}, username:${username}, age:${age}`
  );

  if (database) {
    // 1. database 연결여부 확인
    //2. 함수호출
    editMember(database, userid, userpw, username, age, (err, result) => {
      if (!err) {
        //3. 함수 호출 예외처리
        if (result.modifiedCount > 0) {
          //4. 정상적인 값 result가 발생하였을때, 함수 정상처리 결과
          res.writeHead("200", { "content-type": "text/html;charset=utf-8" });
          res.write("<h2>회원정보 수정 성공!</h2>");
          res.write("<p>정보수정에 성공했습니다</p>");
          res.end();
        } else {
          res.writeHead("300", { "content-type": "text/html;charset=utf-8" });
          res.write("<h2>회원정보 수정 실패!</h2>");
          res.write("<p>정보수정 실패</p>");
          res.end();
          console.log(err);
        }
      } else {
        res.writeHead("500", { "content-type": "text/html;charset=utf-8" });
        res.write("<h2>회원정보 수정 실패!</h2>");
        res.write("<p>Server Error!! 정보수정 실패</p>");
        res.end();
        console.log(err);
      }
    });
  } else {
    res.writeHead("300", { "content-type": "text/html;charset=utf8" });
    res.write("<h2>데이터 베이스 연결 실패</h2>");
    res.write("<p>mongodb 데이터베이스에 연결하지 못했습니다</p>");
    res.end();
  }
});

// 회원 삭제
// http://localhost:3000/member/delete (post)
router.route("/member/delete").post((req, res) => {
  console.log("/member/delete 호출!");

  // 수정하고자 하는 정보 입력
  const userid = req.body.userid;
  console.log(`userid:${userid}`);

  if (database) {
    deleteMember(database, userid, (err, result) => {
      if (!err) {
        if (result.deletedCount > 0) {
          //4. 정상적인 값 result가 발생하였을때, 함수 정상처리 결과
          res.writeHead("200", { "content-type": "text/html;charset=utf8" });
          res.write("<h2>데이터베이스 삭제 성공</h2>");
          res.write("<p>정상적으로 회원정보가 삭제되었습니다</p>");
          res.end();
        } else {
          res.writeHead("300", { "content-type": "text/html;charset=utf-8" });
          res.write("<h2>회원정보 삭제 실패!</h2>");
          res.write("<p>정보 삭제 실패</p>");
          res.end();
          console.log(err);
        }
      } else {
        res.writeHead("300", { "content-type": "text/html;charset=utf8" });
        res.write("<h2>데이터베이스 삭제 실패</h2>");
        res.write(
          "<p>서버에 연결하지 못했습니다(호출 불가능), 회원정보를 다시한번 확인해주세요</p>"
        );
        res.end();
      }
    });
  } else {
    res.writeHead("300", { "content-type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.write("<p>mongodb 데이터베이스에 연결하지 못했습니다</p>");
    res.end();
  }
});

//-----------------------------------------------------------
// 회원가입
const joinMember = function (
  database,
  userid,
  userpw,
  username,
  age,
  callback
) {
  //callback(err,result)
  console.log("joinMember 호출!");
  const members = database.collection("member"); //컬렉션 객체로 지정
  //members.insertMany()컬렉션을 저장
  members.insertMany(
    [{ userid: userid, userpw: userpw, username: username, age: age }],
    (err, result) => {
      if (!err) {
        //3-1 members.updateOne() 예외처리
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
        callback(err, null);
      }
    }
  );
};

// 로그인
const loginMember = function (database, userid, userpw, callback) {
  console.log("loginMember 호출!");
  const members = database.collection("member");

  members.find({ userid: userid, userpw: userpw }).toArray((err, result) => {
    //find()는 여러개의 객체를 찾을수 있기 때문에 배열로 toArray()를 사용함
    if (!err) {
      if (result.length > 0) {
        console.log("사용자를 찾았습니다.");
        callback(null, result);
      } else {
        console.log("일치하는 사용자가 없습니다.");
        callback(null, null);
      }
      return;
    } else {
      console.log(err);
      callback(err, null);
    }
  });
};

// 정보 수정
const editMember = function (
  database,
  userid,
  userpw,
  username,
  age,
  callback
) {
  console.log("editMember 호출"); // 함수 호출 확인
  const members = database.collection("member"); // database.collection(테이블)

  //members.updateOne()을 실행하였을때, modifiedCount값이 발생
  members.updateOne(
    { userid: userid },
    { $set: { userid: userid, userpw: userpw, username: username, age: age } },
    (err, result) => {
      if (!err) {
        // updateone에 대한 예외처리
        if (result.modifiedCount > 0) {
          console.log(`사용자 document ${result.modifiedCount}명 추가됨!`);
        } else {
          console.log("수정된 document 없음!");
        }
        // console.log(result);
        callback(null, result);
        return;
      } else {
        console.log(err);
        callback(err, null);
      }
    }
  );
};

// 회원 삭제
const deleteMember = function (database, userid, callback) {
  console.log("deletemember 호출성공!");
  const members = database.collection("member");

  members.deleteOne({ userid: userid }, (err, result) => {
    if (!err) {
      if (result.deletedCount > 0) {
        console.log(`사용자 document ${result.deletedCount}명 삭제됨`);
      } else {
        console.log("삭제된 document 없음!");
      }
      callback(null, result);
      return;
    } else {
      console.log(err);
      callback(err, null);
    }
  });
};

app.use("/", router); //라우터객체를 서버에서 사용한다고 정의

app.listen(port, () => {
  console.log(`${port}포트로 서버 동작중...`);
  connectDB(); //데이터베이스를 연결하는 함수 호출
});
