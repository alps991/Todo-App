import React from 'react';
import axios from 'axios';

class AddTodo extends React.Component {

    state = {
        text: ''
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'https://todos-alps.herokuapp.com/todos/',
            data: {
                text: this.state.text
            }
        }).then((res) => {
            this.setState({ text: '' });
            console.log('new todo was posted');
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <h3>Add a new Todo</h3>
                <form className="form" onSubmit={this.handleSubmit}>
                    Text: <input type="text" value={this.state.text} onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}

export default AddTodo;