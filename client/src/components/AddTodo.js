import React from 'react';
import { connect } from 'react-redux';
import { startAddTodo } from '../actions/todos';

class AddTodo extends React.Component {

    state = {
        text: ''
    }

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.startAddTodo(this.state.text, this.props.token);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="content-container">
                <h3>Add a new Todo</h3>
                <form className="form">
                    <input
                        className="text-input"
                        placeholder="Enter new to-do text"
                        type="text" value={this.state.text}
                        onChange={this.handleChange}
                    />
                    <button className="button" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
    startAddTodo: (text, token) => dispatch(startAddTodo(text, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);