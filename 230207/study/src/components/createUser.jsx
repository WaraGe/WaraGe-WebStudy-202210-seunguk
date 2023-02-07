import React from "react";

export default function CreateUser({username, email, gender, age, onChange, onCreate}) {
    return(
        <div>
            <input name="username" onChange={onChange} placeholder="이름을 입력해주세요" value={username} maxlength='3'/><br/>
            <input name="email" onChange={onChange} placeholder="아이디를 입력해주세요" value={email} maxlength='16'/><br/>
            <input name="gender" onChange={onChange} placeholder="성별를 입력해주세요" value={gender} maxlength='2'/><br/>
            <input name="age"onChange={onChange}  placeholder="나이를 입력해주세요" value={age} maxlength='3'/><br/>
            <button onClick={onCreate}>등록</button>
        </div>
    )
}