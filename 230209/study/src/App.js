import React ,{useState , useRef, useMemo} from 'react';
import './App.css';
import Counter from './components/counter';
// import Input from './components/input';
// import MultiInput from './components/multiinput';
// import UserList from './components/userlist';
import UserList2 from './components/userList2';
import CreateUser from './components/createUser';

function countActiveUser(users) {
  console.log('선택된 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

function App() {
  //새로추가될 배열요소를 저장하는 공간에 대해 초기값을 설정

  // const 상수명 = 'kkk';
  // let 변수명 = '1111';

  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    gender: '',
    age: ''
  });

  const {username, email, gender, age} = inputs; 
  //비구조할당 -> 여러개의 초기값이 설정됐다 선언

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]:value, 
    })
  }

  // 배열 요소 삭제하는 함수.
  const onRemove = id => {
    // user.id가 파라미터와 일치하지 않는 원소만 추출해서 새로운 배열을 만듦
    // user.id가 id인 것을 제거함
    // 파라미터로 추출한 id값과 일치하지 않는 배열요소만 화면 바운딩
    // 바운딩 => 데이터를 html에 입력해서 화면에 보여주는 것을 의미
    setUsers(users.filter(user => user.id !== id));
    // 배열명.filter(조건식) => 조건이 참인 내용만 화면에 출력
  }

  // 배열 요소 수정하는 함수.
  const onToggle = (id) => {
    setUsers(
      users.map(user => user.id === id ? {...user, active: !user.active} : user)
    );
    // users.map을 통해 users배열에 배열요소 바운딩
    // user => user.id === id  배열요소에 있는 각각의 user에 대하여 조건식 설정(user.id === id의 조건)
    // 참이라면 {...user, active: !user.active} 실행 > 배열 요소에서 active가 안된 요소를 의미
    // 거짓이라면 user 실행
  }
  const usernameInput = useRef(); // dom객체로 선택선언!


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

  const nextId = useRef(6); 
  //최초에 추가할때 현재 배열의 마지막에 추가될 eq값을 미리 설정

  const onCreate = () => {
    const user = {
        id: nextId.current,
        username, email, age, gender
    };

    // 배열에 새 항목을 추가할 때는 spread연산자 또는 concat 함수를 사용
    // setUsers([...users, user]);
    setUsers(users.concat(user));
    
    // 추가하기위해서 입력한 input태그를 빈 공백으로 초기화
    setInputs({
      username: '',
      email: '',
      gender: '',
      age: ''
    });

    
    // 다음에 추가될 배열요소 eq값
    nextId.current += 1;

    usernameInput.current.focus();
  }

  // 배열 요소 개수 추출하는 함수
  const count = useMemo( () => countActiveUser(users), [users] ) // 리턴결과 값을 다시 콜백
  // useState() : 상태값 설정, [초기상태값, 상태값설정함수명] = useState(데이터타입)
  // useRef() : dom요소를 선택하는 훅 함수 태그에 ref라는 속성으로 '훅 함수로 선택할때 사용하는 이름' 속성을 지정해서
  // useEffect() : 컴포넌트가 마운트 되었을때 (처음 나타났을때), 언마운트(컴포넌트가 사라질때)
  // useMemo() : 성능 최적화를 위한 연산된 값을 사용하게 하는 훅 함수(특정결과값을 재사용)
  // useCallback(): 특정 함수를 새로 만들지 않고 재사용 하고 싶을때(특정함수를 재사용)
  // useReducer() : 컴포넌트 상태를 분리할때

  return (
    <div>
      <Counter />
      {/* <Input /> */}
      {/* <MultiInput/>*/}
      {/* <UserList />*/}
      <CreateUser 
        username={username}
        email={email}
        age={age}
        gender={gender}
        onChange={onChange}
        onCreate={onCreate}
        usernameInput={usernameInput}
      />
    <UserList2 users={users} onRemove={onRemove} onToggle={onToggle}/>
    <div>선택된 사용자 수 {count}</div>
    </div>
  );
}

export default App;