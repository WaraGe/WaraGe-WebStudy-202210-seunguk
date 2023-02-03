import React from 'react';
import './App.css';
import Hello from './components/hello';
import Hello2 from './components/hello2';
import Wrapper from './wrapper';

function App() {
  const name = "임꺽정"
  
  const style = {
    backgroundColor: 'deepskyblue',
    color: 'white',
    fontSize: 40,
    padding: '1rem'
  }
  return (
    // 단순히 묶음으로 사용할 경우 <>태그들</>
    // props => properties, 속성 컴포넌트에 전달해서 사용
    <>
      <Wrapper>
        <div style={{fontSize: '50px'}}>{name}</div>
        <div className='box'>선택자로 스타일을 선언하는 방법</div>
        <div style={{width : "500px", height : "200px", marginTop : "30px", backgroundColor : "red"}}>인라인으로 스타일 적용</div>
        <div style={style}>객체를 선언해서 스타일을 인라인에 적용하기</div>

        <Hello name='apple' color='red' isSpecial={true} />
        <Hello name='banana' color='green' isSpecial={false}/>
        <Hello name='orange' color='blue' isSpecial={false}/>
        <Hello isSpecial={true}/>

        <br /><br />
        <Hello2 name='apple' color='red' isSpecial={true} />
        <Hello2 name='banana' color='green' isSpecial={false}/>
        <Hello2 name='orange' color='blue' isSpecial={false}/>
      </Wrapper>
      {/* 첫자가 대문자인것은 컴포넌트 */}
      
      </>
  );
}

export default App;