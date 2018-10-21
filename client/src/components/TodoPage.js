import React from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';

class TodoPage extends React.Component {

    state = {
        todos: undefined
    }

    componentWillMount() {
        axios({
            method: 'get',
            url: 'https://todos-alps.herokuapp.com/todos/'
        }).then((res) => {
            this.setState({ todos: res });
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });

    }

    render() {
        return (
            <div>
                <AddTodo />
                {this.state.todos.map((todo) => {
                    return (
                        <div>
                            <h3>todo.text</h3>
                            <p>todo.completed</p>
                            <p>todo.createdAt</p>
                        </div>
                    );
                })}
            </div>
        )
    }
}

export default TodoPage;