import React, {useState} from "react";

function Input() {
    const [text, setText] = useState('') //초기상태 공백

    const onChange = (e) => {
        setText(e.target.value);
    };
    const onReset = (e) => {
        setText(e.reset);
    };

    return(
        <div>
            <input onChange={onChange} value={text} />
            <button onClick={onReset}>지우기</button>
            <div>
                <b>값: {text}</b>
            </div>
        </div>
    )
}


export default Input;
