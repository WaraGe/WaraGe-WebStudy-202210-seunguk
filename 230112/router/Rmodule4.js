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
    // http://localhost:3000/joinmember/apple

    // http://localhost:3000/updatemember/apple

    // http://localhost:3000/deletemember/berry
}