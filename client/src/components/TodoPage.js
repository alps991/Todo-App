import React from 'react';
import AddTodo from './AddTodo';
import { connect } from 'react-redux';
import { startGetTodos } from '../actions/todos';

class TodoPage extends React.Component {

    constructor(props) {
        super(props);
        this.props.startGetTodos(this.props.token);
    }

    render() {
        if (!this.props.todos[0]) {
            return (
                <div>
                    <h2>Todos are not yet recieved</h2>
                </div>
            );
        }
        return (
            <div>
                <AddTodo />
                {this.props.todos.map((todo, i) => {
                    return (
                        <div key={i}>
                            <h3>{todo.text}</h3>
                            <p>{todo.completed ? 'Complete' : 'Incomplete'}</p>
                            <p>{todo.createdAt}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
    startGetTodos: (token) => dispatch(startGetTodos(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);