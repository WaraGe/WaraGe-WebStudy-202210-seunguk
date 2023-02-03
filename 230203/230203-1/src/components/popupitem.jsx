import React from "react";

function PopupItem({src, ItemTitle, ItemDate}) {
    return (
        <div className="popup_item">
            <div className="img_div"><img src={src} alt=""></img></div>
            <h4>{ItemTitle}</h4>
            {/* 테이크핏 케어, 9가지 필수 아미노산이 모두 함유된 완전 단백질 플랜 */}
            <p>{ItemDate}</p>
            {/* 2023.01.30 ~ 2320.06.30 */}
        </div>
    )
}

export default PopupItem;