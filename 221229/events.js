const events = require('events');

// 이벤트 관련 메소드를 사용할 수 있는 EventEmitter 객체 생성(대체화)
const eventEmitter = new events.EventEmitter();

const connectHandler = function () { 3
    console.log('연결 성공!');
    eventEmitter.emit('data_received') // data_received 발생 4
}

// connection 이벤트와 connectionHandler 핸들러와 연결
eventEmitter.on('connection', connectHandler); 2

eventEmitter.on('data+received', () => { 5
    console.log('데이터 수신!');
})

eventEmitter.emit('connection'); //connection이라는 이벤트를 발생(내가 만드는것)  1

console.log('프로그램을 종료합니다');