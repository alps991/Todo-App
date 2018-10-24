import React from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div>Todo Item</div>
            <div>Status</div>
        </div>
        <div className="list-body">
            {props.todos.map((todo, i) => {
                return <TodoItem
                    key={i}
                    text={todo.text}
                    completed={todo.completed}
                    createdAt={todo.completedAt}
                    id={todo._id}
                />;
            })}
        </div>
    </div >
);

export default TodoList;