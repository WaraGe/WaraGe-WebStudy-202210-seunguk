import { useRef, useState } from 'react';
import './App.css';
// import Counter from './components/counter';
// import Input from './components/input';
// import MultiInput from './components/multiInput';
// import UserList from './components/userList';
import CreateUser from './components/createUser';
import UserList2 from './components/userList2';

function App() {
  // 새로 추가될 배열요소를 저장하는 공간에 대하여 초기값 지정
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    gender: '',
    age: ''
});

  const {username, email, gender, age} = inputs; // 비구조 할당->여러개의 초기값이 설정되었다면 선언

  const onChange = (e) => {
    const {value, username, email, gender, age} = e.target;
    setInputs({
      ...inputs,
      [username]:value, 
      [email]:value, 
      [gender]:value, 
      [age]:value
    })
  }
  // Hook함수로 삭제
  const [users, setUsers] = useState([
    {
        id: 1,
        username: 'KimApple',
        email: 'apple@apple.com',
        age: '11',
        gender: 'men'
    },
    {
        id: 2,
        username: 'LeeOrange',
        email: 'orange@orange.com',
        age: '22',
        gender: 'transGender'
        
    },
    {
        id: 3,
        username: 'HwangHana',
        email: 'banana@banana.com',
        age: '33',
        gender: 'woman'
    },
    {
        id: 4,
        username: 'LeeMelon',
        email: 'melon@melon.com',
        age: '44',
        gender: 'girl'
    },
    {
        id: 5,
        username: 'BaeAri',
        email: 'berry@berry.com',
        age: '55',
        gender: 'gay'
    }
]);
const nextId = useRef(6); // 최초에 추가할때 현재 배열에 마지막에 추가될 EQ값 미리속성

const onCreate = () => {
  const user = {
    id: nextId.current,
    username, email, age, gender
  };

  //배열에 새 학몽을 추가할때는 spread연산자 또는 concat 함수를 사용함.
  //setUsers([...users, user]);
  setUsers(users.concat(user));

  //추가하기 위하여 입력한 input태그를 빈공백으로 초기화
  setInputs({
    username: '',
    email: '',
    gender: '',
    age: ''
  });

  //다음에 추가될 배열 요소의 eq값
  nextId.current += 1;
  // nextId.current = nextId.current++;

}

  return (
    <div>
      {/* <Counter/> */}
      -------------------------------------------------------
      {/* <Input/> */}
      -------------------------------------------------------
      {/* <MultiInput/> */}
      -------------------------------------------------------
      {/* <UserList/> */}
      <CreateUser
        username={username}
        email={email}
        age={age}
        gender={gender}
        onChange={onChange}
        onCreate={onCreate}/>
      {/* 화면에 보여지는 함수 */}
      <UserList2 users = {users}/>
      {/* UserList2에 users의 값을 전달 */}
    </div>
  );
};


export default App;
