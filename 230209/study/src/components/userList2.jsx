import React from "react";
import { useEffect } from "react";

function User({user, onRemove, onToggle}) {
    useEffect(() => {
        console.log('컴포넌트가 실행됨');
        return () => {
            console.log('컴포넌트가 사라짐 뿅');
        }
    });
    return(
        <div>
            <b onClick={() => onToggle(user.id)} style={{
                cursor: 'pointer',
                color: user.active ? 'deeppink' : 'black'
            }}>{user.username}</b> <br/>
            <b>{user.email}</b> <br/>
            <b>{user.age}</b> <br/>
            <b>{user.gender}</b> <br/>
            --------------------------
            <button onClick={() => onRemove(user.id)}>삭제</button>
            {/* <button onClick={onRemove}></button>
            onRemove()함수를 호출하면 마운트가 되면서 자동실행 되므로 
            onClick={onRemove}를 선언하여 이벤트가 발생시 실행
            
            콜백함수형식으로 함수호출 => onclick={() => onToggle(user.id)}*/}
        </div>
    )
}

function UserList2({users, onRemove, onToggle}) {
    return(
        <div>
            {/* <div><User user={users[0]}/></div>
            <div><User user={users[1]}/></div>
            <div><User user={users[2]}/></div>
            <div><User user={users[3]}/></div>
            <div><User user={users[4]}/></div> */}
            {users.map((user, index) => (
                <User user={user} key={index} onRemove={onRemove} onToggle={onToggle} />
            ))}

            {/* --위와 같은 설명--

            {users.map((user) => (
                <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
            ))} */}
        </div>
    )
};

export default UserList2;