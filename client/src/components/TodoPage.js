import React from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';
import { connect } from 'react-redux';

class TodoPage extends React.Component {

    state = {
        todos: undefined
    }

    componentWillMount() {
        console.log(this.props.token);
        axios({
            method: 'get',
            url: 'https://todos-alps.herokuapp.com/todos/',
            headers: {
                'x-auth': this.props.token
            }
        }).then((res) => {
            this.setState({ todos: res });
            console.log('This is the res:')
            console.log(res);
        }).catch((err) => {
            console.log('This is the error:')
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

const mapStateToProps = (state) => ({
    token: state.auth.token
});

export default connect(mapStateToProps)(TodoPage);