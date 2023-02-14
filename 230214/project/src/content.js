import React, {createContext, useContext, useReducer, useRef} from "react";

const initialTodos = [
    {  
        id: 1,
        text: '프론트엔드 프로젝트 만들기',
        done: false
    },
    {  
        id: 2,
        text: '밥 잘 챙겨먹기',
        done: true
    },
    {  
        id: 3,
        text: '운동하기',
        done: true
    },
    {  
        id: 4,
        text: '비타민 먹기',
        done: false
    }
]

function todoReducer(state, action) {
    switch(action.type) {
        case 'Create':
            return state.concat(action.todo);
        case 'Toogle':
            return state.map(todo => 
                todo.id === action.id ? {...todo, done: !todo.done} : todo);
        case 'Remove':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Error! ${action.type}이 잘못 전달됨`);
    }
}

const TodoStateContext = createContext(); // 배열을 랜더링 상태컴포넌트
const TodoDispatchConText = createContext(); // 배열을 편집하는 상태컴포넌트
const TodoNextIdContext = createContext(); // 배열을 추가하는 상태컴포넌트


export default function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return(
        <div>
            <TodoStateContext.Provider value={state}>
                <TodoDispatchConText.Provider value={dispatch}>
                    <TodoNextIdContext.Provider value={nextId}>
                        {children}
                    </TodoNextIdContext.Provider>
                </TodoDispatchConText.Provider>
            </TodoStateContext.Provider>
        </div>
    )
}
export function userTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('TodoProvider를 찾을 수 없음');
    }
    return context;
}

// ContextAPI => 자료 전역으로 사용하기 위한 함수
// createContext() => 틀잡기
// useContext() => 자료의 상태를 불러옴
   