import React from "react";
import { useReducer } from "react";
// import { useState } from "react";

/*
function Counter() {
    const [number, setNumber] = useState(0);
    const plus = () => {
        setNumber(number + 1);
    };

    const minus = () => {
        setNumber(number - 1);
    };

    return (
        <div>
            <h2>{number}</h2>
            <button onClick={plus}>더하기</button>
            <button onClick={minus}>빼기</button>
        </div>
    )
}
*/
function reducer(state, action) {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function Counter() {
    const [number, dispatch] = useReducer(reducer, 0);
    // dispatch -> 이벤트 생성
    const plus = () => {
        dispatch({type:'INCREMENT'});
    };

    const minus = () => {
        dispatch({type:'DECREMENT'});
    };

    return (
        <div>
            <h2>{number}</h2>
            <button onClick={plus}>더하기</button>
            <button onClick={minus}>빼기</button>
        </div>
    )
}

export default Counter;