import React from "react";

function Hello2(props) {
    return(
        <div>
            {/* props = {color:'gold", name:'김사과', isSpecial={true}}*/} 
            {/* 밑에값 출력 */}
            <h3 style={{color: props.color}}>
                {props.isSpecial ? <b>★</b> : null} Hello {props.name};
                {/* true이면 앞쪽에 ★출력 */}
            </h3>
        </div>
    )
}

export default Hello2;