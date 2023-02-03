import React from 'react';
import './App.css';
import Headers from './components/headers'
import MainImg from './components/mainimg'
import Contents from './components/contents'
import Footer from './components/footer'
import Counter from './components/counter';
import Input from './components/input';

function App() {
  return (
    <div>
      <Headers>
        <h1>로고입니다</h1>.....
      </Headers>
      <p>-----------------------------------------------------------</p>
      <Counter/>
      <Input/>
      <MainImg/>
      <Contents/>
      <Footer/>
    </div>
  );
}

export default App;
