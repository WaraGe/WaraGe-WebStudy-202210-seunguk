import React, { useState } from "react";
import styled, { css } from "styled-components"; //
import { MdAdd } from "react-icons/md";

const InsertFormPositioner = styled.div`
  width: 100%;
  height: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const CircleButton = styled.button`
  /* background-color: #38d9a9;
  &:hover {
    background-color: #63e6be;
  }
  &:active {
    background-color: ##20c997;
  } */
  
  display: block; // inline == button이라 block으로 설정
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 80px;

  /* 중앙 위치 잡는방법 position으로 중앙으로 땡기고 transform으로 정확하게 왼쪽으로 땡겨간것을 변경 */
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);

  border: none;
  outline: none;
  border-radius: 50%;
  background-color: green;
  font-size: 60px; // 아이콘의 크기

  color: white;
  /* 다시한번 플렉스 줘서 중앙값으로 맞추기 */
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;

  ${(props) =>
    props.open &&
    css`
      background-color: #38d9a9;
      &:hover {
        background-color: #ff8787;
      }
      &:active {
        background-color: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertForm = styled.form`
  background-color: #f8f9fa;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;
  padding-left: 32px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  width: 100%;

  padding: 12px;
  border: 1px solid #dee2e6;
  border-radius: 4px;

  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

export default function TodoCreate() {
  const [open, setOpen] = useState(false);
  const onToggle = () => {
    setOpen(!open);
  };
  //open이 참이면 (n) n값을 실행
  return (
    <>
      {" "}
      {open && (
        <InsertFormPositioner>
          <InsertForm>
            <Input autoFocus placeholder="할 일을 입력 후, Enter키를 눌리세요" />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}
