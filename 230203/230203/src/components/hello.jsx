import React from "react";

function Hello({name, color, isSpecial}) {
    return(
        <div>
            {/* <h3 style={{ color }}>Hello {name}</h3> */}
            <h3 style={{color}}>
                {isSpecial ? <b>★</b> : null} Hello {name};
                {/* true이면 앞쪽에 ★출력 */}
            </h3>
        </div>
    )
}
//props값이 없을때 호출할 값
Hello.defaultProps = {
    color: 'pink',
    name: '무명'
}

export default Hello;