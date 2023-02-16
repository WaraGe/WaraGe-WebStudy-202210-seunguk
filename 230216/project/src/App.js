import React from 'react';
import './App.css';
//yarn add react-router-dom@5
import {Route, Link} from 'react-router-dom';
import Home from './component/home'
import About from './component/about'
import Profiles from './component/profiles'
import History from './component/history'

function App() {
  return (
    <div>
      {/* <Link to="주소">문자</Link> */}
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/profiles">Profiles</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
      <hr/>
      {/* <Route path="주소" component={보여줄 컴포넌트}/> */}
      <Route path="/" exact={true} component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/profiles" component={Profiles}/>
      <Route path="/history" component={History}/>

    </div>
  );
}

export default App;
