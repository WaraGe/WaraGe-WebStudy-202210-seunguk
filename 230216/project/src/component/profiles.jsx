import React from "react";
import {Route, Link} from 'react-router-dom';
import Profile from '../component/profile'

const Profiles = () => {
    return(
        <div>
            <h1>Profiles Page</h1>
            <p>This is the profile page</p>
            <h2>user list</h2>
            <ul>
                <li>
                    <Link to="/profiles/apple">apple</Link>
                </li>
                <li>
                    <Link to="/profiles/banana">banana</Link>
                </li>
            </ul>

            <Route path='/profiles' exact render={() => <div>유저를 선택하세요</div>}/>
            <Route path='/profiles/:username' component={Profile}/>
        </div>
    )
}

export default Profiles;