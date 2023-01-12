module.exports = (app, fs) => {
    // http://localhost:3000
    app.get('/', (req, res) => {
        res.render('index.ejs', {length : 10});
    })
    // http://localhost:3000/about
    app.get('/about', (req, res) => {
        res.render('../views/about.html');
    })
    // http://localhost:3000/list
    app.get('/list', (req, res) => {
        fs.readFile(__dirname + '/../data/member.json', 'utf8', (err, data) => {
            if (!err) {
                console.log(data);
                res.writeHead(200, { 'content-type': 'text/json;charset-utf-8' });
                res.end(data);
            } else {
                console.log(err);
            }
        })
    })
    // http://localhost:3000/getmember/apple
    app.get('/getmember/:userid', (req, res) => {
        //특정값을 추출할때 /라우터명/:변수명 -> 웹브라우저에서는 /라우터명/변수값
        fs.readFile(__dirname + '/../data/member.json', 'utf-8', (err, data) => {
            if (!err) {
                const member = JSON.parse(data);
                res.json(member[req.params.userid]); // [] => 배열형식, 조건식
                console.log(data);
            } else {
                console.log(err);
            }
        })
    })
    // http://localhost:3000/joinmember/apple 회원가입 조회
    app.post('/joinmember/:userid', (req, res) => {
        const result = {}; // 빈객체 생성 -> 서버실행상태를 저장
        const userid = req.params.userid;

        // 입력된 정보가 같은게 있는지 중복검사
        if (!req.body["password"] || !req.body["name"]) {
            // result라는 객체에 "seccuess": 100, "msg": "invalid request" 출력
            // res.json(result); JSON파일형식으로 읽기
            result["success"] = 100; // 100 : 실패
            result["msg"] = "invalid request";
            res.json(result);
            return false; // 아래의 명령어 실행을 하지 않고 프로그램 종료
        } 

        // 
        fs.readFile(__dirname + '/../data/member.json', 'utf-8', (err, data) => {
            const member = JSON.parse(data); // 맴버객체명 지정 - 대상을 지정하기 위해
            if (member[userid]) { // 요청한 params가 존재한다면 조건식
                result["success"] = 101; // 101 : 중복
                result["msg"] = "duplicate";
                res.json(result);
                return false; 
            }
            console.log(req.body); // post방식으로 입력한 정보를 말함
            member[userid] = req.body;
            fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf-8', (err, data) => {
                if (!err) {
                    result["success"] = 200; // 200 : 성공
                    result["msg"] = "success";
                    res.json(result);
                } else {
                    console.log(err);
                }
            });
        })
    })
    // http://localhost:3000/updatemember/apple

    // http://localhost:3000/deletemember/berry
}