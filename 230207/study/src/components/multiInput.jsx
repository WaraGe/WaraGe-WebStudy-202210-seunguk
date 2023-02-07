import React from "react";
import { useState, useRef } from "react";

export default function MultiInput() {
    // const text = 'text';
    const [inputs, setInputs] = useState({
        name: '',
        userId: '',
        gender: '',
        age: ''
    });
    const nameInput = useRef();
    const userIdInput = useRef();
    const genderInput = useRef();
    const ageInput = useRef();


    const {name, userId, gender, age} = inputs; // 비 구조화 할당을 통하여 값을 전달

    const onChange = (e) => {
        const {value, name, userId, gender, age} = e.target; // e.target에서 name과 value를 가져옴
        setInputs({//...은 배열이라는 의미
            ...inputs, // ... spread문법 (객체를 복사), 여러개의 값이 저장됨
            [name]:value, //name 키를 가진 값음 value로 설정
            [userId]:value, //name 키를 가진 값음 value로 설정
            [gender]:value, //name 키를 가진 값음 value로 설정
            [age]:value //name 키를 가진 값음 value로 설정
            // aaaaa, 홍길동 => {userid: 'aaaaa', name:'홍길동'}
        });
    }
    const onReset = () => {
        // setInputs(' ');
        setInputs({ // 지우기 상태가 아닌 빈 공백 상태
            name: '',
            userId: '',
            gender: '',
            age: ''
        })
        nameInput.current.focus(); // 리셋을 하고 나서 name input칸에 focus가 들어가도록 생성 (ref는 선택하는 속성이 있음)
    }
    


    return(
        <div>
            <input name="name" onChange={onChange} placeholder="이름" value={name} maxlength='3' ref={nameInput}/><br/>
            <input name="userId" onChange={onChange} placeholder="아이디" value={userId} maxlength='16' ref={userIdInput} /><br/>
            <input name="gender" onChange={onChange} placeholder="성별" value={gender} maxlength='2' ref={genderInput} /><br/>
            <input name="age" onChange={onChange} placeholder="나이" value={age} maxlength='3' ref={ageInput} /><br/>
            <button onClick={onReset}>지우기</button>    
            <div>
                <b>이름: {name}</b><br/>
                <b>아이디 : {userId}</b><br/>
                <b>성별 : {gender}</b><br/>
                <b>나이 : {age}</b><br/>
            </div>
        </div>
    )
}

// export default Input;