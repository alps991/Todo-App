import React from 'react';
import { connect } from 'react-redux';
import { startAddTodo } from '../actions/todos';

class EditTodo extends React.Component {

    state = {
        text: '',
        completed: false
    }

    handleTextChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleStatusChange = (e) => {
        this.setState({ compelted: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.startAddTodo(this.state.text, this.props.token);
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="content-container">
                <h3>Edit Todo</h3>
                <form className="form">
                    Text: <input type="text" value={this.state.text} onChange={this.handleTextChange} />
                    <div onChange={this.handleStatusChange}>
                        Status:
                        <input type="radio" value="Incomplete" name="status" /> Incomplete
                        <input type="radio" value="Completed" name="status" /> Completed
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);