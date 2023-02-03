import React from "react";
import Subttl from "./subttl";
import PopupItem from "./popupitem";

function Popup() {
  return (
    <div className="sub">
      <div
        style={{ width: "100%", height: "400px", backgroundColor: "skyblue" }}
      >
        sub mainImg
      </div>
      <div className="sub_content">
        <h3>기획전</h3>
        <Subttl subTitle="남양 기획전" count="총 4건의 기획전이있습니다." />
        <div className="list">
          <PopupItem
            src="https://shoppingcdn.namyangi.com/attach/item/2023/202301/f51165d8-6e0e-4463-bdaa-da6fa933a895.png"
            ItemTitle="테이크핏 케어, 9가지 필수 아미노산이 모두 함유된 완전 단백질 플랜"
            ItemDate="2023.01.30 ~ 2023.06.30"
          />
          <PopupItem
            src="https://shoppingcdn.namyangi.com/attach/item/2022/202211/3d8bd170-f24b-42f7-958f-eee11cfe77f1.png"
            ItemTitle="우리아이 성장의 KEY를 찾다 키플러스 (성장기어린이/청소년)"
            ItemDate="2022.11.02 ~ 2023.06.30"
          />
          <PopupItem
            src="https://shoppingcdn.namyangi.com/attach/item/2022/202211/f95274ad-2da6-4172-8f6e-53bbeb1f6e5b.png"
            ItemTitle="국내산 천마로 더 진하고 든든한 천마차(단호박/콘플레이크)"
            ItemDate="2022.11.02 ~ 2023.06.30"
          />
          <PopupItem
            src="https://shoppingcdn.namyangi.com/attach/item/2022/202210/c8853528-4bbf-47c2-85d4-2a0463b31fca.png"
            ItemTitle="든든한 하루의 시작 아몬드데이 (오리지널/언스위트)"
            ItemDate="2022.10.06 ~ 2023.06.30"
          />
        </div>

        <Subttl subTitle="입점사 기획전" count="총 0건의 기획전이있습니다." />
        <div className="list"></div>
      </div>
    </div>
  );
}

export default Popup;
