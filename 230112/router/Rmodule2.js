module.exports = (app, fs) => {
    // http:// localhost:3000
    app.get('/', (req, res) => {
        res.render('index.ejs', {length : 10});
    })
    // http:// localhost:3000/about

    // http:// localhost:3000/list

    // http:// localhost:3000/getmember/apple

    // http:// localhost:3000/joinmember/apple

    // http:// localhost:3000/updatemember/apple

    // http:// localhost:3000/deletemember/berry
}