import React from 'react';
import './App.css';
import {createGlobalStyle} from 'styled-components';
import TodoTemplate from './components/todoTemplate';
import TodoHead from './components/todoHead';
import TodoList from './components/todoList';
import TodoCreate from './components/todoCreate';

// [styled - components]
// js안에 css를 작성하는 라이브러리
// yarn add styled-components
// [react - icons]
// (https://react-icons.github.io/react-icons/#/)
// yarn add react-icon

//전체를 포함하는 컴포넌트 선언
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle/>
        <TodoTemplate>
          <TodoHead/>
          <TodoList/>
          <TodoCreate/>
        </TodoTemplate>
    </>
  );
}

export default App;
