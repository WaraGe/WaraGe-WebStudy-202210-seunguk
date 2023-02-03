import React, { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0); // 초기값의 값이 0인 integer형
  const [text, setText] = useState("0"); // 초기값의 값이 "0"인 문자형 
  const [isState, setIsState] = useState(true); // 초기값의 값이 true인 boolean형
  // 리엑트에서 값이 바뀌는 저장공간을 선언할때는
  // const[저장공간이름, 저장공간에 값을 변화시킬 함수명] = userState(초기값)

  const plus = () => {
    setNumber(number + 1);
    console.log("++");
    // 초기상태에서 값이 바뀌는것 (연산처리되는것이 아님)
  };

  const minus = () => {
    setNumber(number - 1);
    console.log('--');
  };
  
  return (
    <div>
      <h2>{number}</h2>
      <button onClick={plus}>더하기</button>
      <button onClick={minus}>빼기</button>
    </div>
  );
}

export default Counter;
