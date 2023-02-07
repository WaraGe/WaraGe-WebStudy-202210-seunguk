import React from "react";
import { useState } from "react";

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

export default Counter;