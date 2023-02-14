import React from "react";
import styled, {css} from 'styled-components'; //
import { MdDone, MdDelete } from "react-icons/md";

const Remove = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;

    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;

    &:hover {
        color: #ff6b6b;
    }
    display: none;
`

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;

    //&는 현제 컴포넌트를 의미
    &:hover {
        ${Remove}{
            display: initial; // 부모 객체의 값을 가져옴
        }
    }
    /* 컴포넌트 선택이라는 기능 => TodoItemBlock위에 마우스 커서가 있을때 */
    /* remove컴포넌트를 보여주라는 의미(초기값으로는 숨김) */
`

const CheckCirCle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;

    width: 32px;
    height: 32px;

    border: 1px solid #ced4da;
    border-radius: 16px;
    font-size: 24px;
    cursor: pointer;
    ${props => 
        props.done && // props.done값이 참이면 밑의 css결과값 실행
        css`
            border: 1px solid #38d9a9;
            color: black;
        `}
    
`

const Text = styled.div`
    flex: 1; // 100%라는 의미
    font-size: 21px;
    color: #495057;
    cursor: pointer;
    ${props => 
        props.done && // props.done값이 참이면 밑의 css결과값 실행
        css`
            color: #38d9a9;
        `}
`


// 조건 && 참일때 실행
// 조건 ? 참일때 실행 : 거짓일때 실행
export default function TodoItem({id, done, text}) {
    return(
            <TodoItemBlock>
                <CheckCirCle done={done}>{done && <MdDone/>}</CheckCirCle>
                <Text done={done}>{text}</Text>
                <Remove><MdDelete/></Remove>
            </TodoItemBlock>
    )
}