const express = require("express");
const bodyParser = require("body-parser");
//npm i serve-static
const static = require("serve-static");
const path = require("path");
//npm i morgan
const logger = require("morgan");
//npm i multer
const multer = require("multer");

const port = 3000;
const app = express();
const router = express.Router();
//localhost:3000/라우터객체명
//localhost:3000/public => 19번 줄의 url을 의미 (라우터 객체명)
// => //localhost:3000/public/write.html 경로에서 write.html 호출

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", static(path.join(__dirname, "public"))); //'/public'라우터명으로 public 폴더를 지정
app.use("/uploads", static(path.join(__dirname, "uploads"))); //'/uploads'라우터명으로 uploads 폴더를 지정
// 서버로그 정보관리(요청과 응답에 대한 정보)
app.use(logger("dev")); // dev, short, common, combined

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // 업로드 되는 파일의 저장폴더
    callback(null, "uploads"); //오류가 없다는 가정하에 null,  폴더지정
  },
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname); //image.png
    const basename = path.basename(file.originalname, extension); // 파일명만 추출
    //원래 파일명, 확장자로 분리
    callback(null, basename + "_" + Date.now() + extension);
  },
});

const upload = multer({
  storage: storage, // diskStorage 설정객체
  limits: {
    // 제한설정
    files: 5, //파일전송갯수
    fileSize: 1024 * 1024 * 100 // 파일전송용량 100mb
  },
});

router.route("/write").post(upload.array("photo", 1), (req, res) => {
  console.log("/write 호출");
  try {
    const title = req.body.title;
    const content = req.body.content;
    const files = req.files;

    console.dir(req.files[0]);

    const originalname = files[0].originalname;
    const filename = files[0].filename;
    const mimetype = files[0].mimetype;
    const size = files[0].size;

    console.log(
      `파일정보: 원본파일명:${originalname},
       파일이름:${filename},
       mimetype:${mimetype},
       파일크기:${size}`
    );

    // 파일 업로드 정보를 화면에 출력
    res.writeHead('200', {'content-type': 'text/html; charset=utf-8'});
    res.write('<h2>파일 업로드 성공</h2>');
    res.write('<hr>');
    res.write(`<p>제목 : ${title}</p>`);
    res.write(`<p>내용 : ${content}</p>`);
    res.write(`<p>원본파일명 : ${originalname}</p>`);
    res.write(`<p>파일명 : ${filename}</p>`);
    res.write(`<p>mimetype : ${mimetype}</p>`);
    res.write(`<p>파일크기 : ${size}</p>`);
    res.write(`<p><img src='/uploads/${filename}' width='200'>`);
    res.end();
  } catch (e) {
    console.log(e);
  }
});

app.use('/',router);

app.listen(port, () => {
  console.log(`${port}포트로 서버 동작중...`);
});