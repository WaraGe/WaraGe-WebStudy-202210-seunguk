import React from "react";
import styled from 'styled-components'; //
import {useTodoState} from '../context';

const TodoHeadBlock = styled.div`
    padding-top: 48px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;

    h1 {
        margin: 0;
        font-size: 36px;
        color: #343a40;
    }
    .week {
        margin-top: 4px;
        color: 868e96;
        font-size: 21px;
    }
    .tasks-work {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`

export default function TodoHead() {
    const todos = useTodoState();
    const undoneTasks = todos.filter(todo => !todo.done);

    return(
        <TodoHeadBlock>
            <h1>2022년 2월 14일</h1>
            <div className="week">수요일</div>
            <div className="tasks-work">할일 {undoneTasks.length}개 남음</div>
        </TodoHeadBlock>
    )
}