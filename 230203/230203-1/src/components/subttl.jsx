import React from "react";

function Subttl({subTitle, count}) {
    const subttl = {
        width: '100%',
        height: '50px',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingBottom: '5px'
    }
    return(
        <div style={subttl}>
            <h3 style={{ fontSize: '20px' }}>{subTitle}</h3> <p style={{ fontSize: '10px' }}>{count}</p>
        </div>
    );
}

export default Subttl;