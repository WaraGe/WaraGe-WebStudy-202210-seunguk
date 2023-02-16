import React,{ useEffect } from "react";

const History = ({history}) => {
    const goBack = () => {
        history.goBack();
    };
    const goHome = () => {
        history.push('/');
    };
    
    useEffect(() => {
        console.log(history);
        const unblock = history.block('정말 떠나실건가요?');
        return () => {
          unblock();
        };
      }, [history]);

    return(
        <div>
            <h1>history Page</h1>
            <p>This is the landing page</p>
            <div>
                <button onClick={goBack}>뒤로가기</button>
                <button onClick={goHome}>홈으로가기</button>
            </div>
        </div>
    )
}

export default History;