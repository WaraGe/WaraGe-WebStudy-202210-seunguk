import React from "react";

function User({user}) {
    return(
        <div>
            <b>{user.username}</b> <br/>
            <b>{user.email}</b> <br/>
            <b>{user.age}</b> <br/>
            <b>{user.gender}</b> <br/>
            --------------------------
        </div>
    )
}

export default function UserList() {
    const users = [
        {
            id: 1,
            username: 'KimApple',
            email: 'apple@apple.com',
            age: '11',
            gender: 'men'
        },
        {
            id: 2,
            username: 'LeeOrange',
            email: 'orange@orange.com',
            age: '22',
            gender: 'transGender'
            
        },
        {
            id: 3,
            username: 'HwangHana',
            email: 'banana@banana.com',
            age: '33',
            gender: 'woman'
        },
        {
            id: 4,
            username: 'LeeMelon',
            email: 'melon@melon.com',
            age: '44',
            gender: 'girl'
        },
        {
            id: 5,
            username: 'BaeAri',
            email: 'berry@berry.com',
            age: '55',
            gender: 'gay'
        }
    ]
    return(
        <div>
            {/* <div><User user={users[0]}/></div>
            <div><User user={users[1]}/></div>
            <div><User user={users[2]}/></div>
            <div><User user={users[3]}/></div>
            <div><User user={users[4]}/></div> */}
            {users.map((user, index) => (
                <User user={user} key={index} />
            ))}
        </div>
    )
};