import React from 'react';
import './App.css';
import Header from './components/header';
import MainImg from './components/mainImg';
import Contents from './components/contents'
import Footer from './components/footer';

function App() {
  // js는 여기에 들어간다
  return (
    <div>
      {/* 리엑트는 단독테그 지원 */}
      <Header/> 
      <MainImg/>
      <Contents/>
      <Footer/>
    </div>
  );
}

export default App;
