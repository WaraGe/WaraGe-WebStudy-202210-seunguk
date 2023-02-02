import React from 'react';
import './App.css';
import Main from './main';

import Member from './components/member'
import Product from './components/product'
import Market from './components/market'
import Brand from './components/brand'
import Popup from './components/popup'
import Event from './components/event'
import Delivery from './components/delivery'

import Footer from './footer';

import {Route, Link} from 'react-router-dom';
/*
라우터 적용
react-router-dom
라우터 관련 함수를 내장
설치: yarn add react-router-dom@5
사용: 상단에 import {Route, Link} from 'react-router-dom'; 선언
1. 특정 주소에 컴포넌트 연결하는 방법
<Route path="주소" component={보여줄 컴포넌트}></Route>
2. 다른 주소로 이동시키기
<Link to="주소">문자</Link>
*/

function App() {
  return (
    <div>
      <div className='header'>
        <div className='header-in'>
          <h1 className='logo'>logo</h1>
          <ul className='nav'>
            {/* 리엑트에서는 a태그를 사용하지 않음 */}
            <li><Link to="/components/member">프리미엄멤버쉽</Link></li>
            <li><Link to="/components/product">냉장식품</Link></li>
            <li><Link to="/components/market">시크릿마켓</Link></li>
            <li><Link to="/components/brand">브랜드관</Link></li>
            <li><Link to="/components/popup">기획전</Link></li>
            <li><Link to="/components/event">이벤트</Link></li>
            <li><Link to="/components/delivery">가정배달</Link></li>
          </ul>
          <div className='info'>info</div>
        </div>
      </div>
      <div>
        {/* 화면에 보이는 서브컴포넌트 */}
        <Route path="/" exact={true} component={Main} />
        <Route path="/components/member" component={Member} />
        <Route path="/components/product" component={Product} />
        <Route path="/components/market" component={Market} />
        <Route path="/components/brand" component={Brand} />
        <Route path="/components/popup" component={Popup} />
        <Route path="/components/event" component={Event} />
        <Route path="/components/delivery" component={Delivery} />
      </div>
      {/* 하단영역 컴포넌트 */}
      <Footer/>
    </div>
  );
}

export default App;
