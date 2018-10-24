import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const TodoSummary = (props) => {
    const todoWord = props.todos.length == 1 ? "To-do" : "To-dos";
    let completedCount = 0;
    props.todos.forEach((todo) => !todo.completed && completedCount++)
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{props.todos.length}</span> {todoWord} ({completedCount} are still incomplete)</h1>
                <div className="page-header__actions">
                    <Link className="button" to="/addTodo">Add Item</Link>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    todos: state.todos
});

export default connect(mapStateToProps)(TodoSummary);