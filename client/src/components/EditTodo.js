import React from 'react';
import { connect } from 'react-redux';
import { startUpdateTodo, startDeleteTodo } from '../actions/todos';

class EditTodo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.selectedTodo.text ? props.selectedTodo.text : '',
            status: props.selectedTodo.status ? props.selectedTodo.status : "incomplete"
        };
    }

    handleTextChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleStatusChange = (e) => {
        this.setState({ status: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.startUpdateTodo(this.state.text, this.state.status, this.props.selectedTodo._id, this.props.token);
        this.props.history.push('/');
    }

    handleDelete = () => {
        this.props.startDeleteTodo(this.props.selectedTodo._id, this.props.token)
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="content-container">
                <h3>Edit Todo</h3>
                <form className="form">
                    <input className="text-input" type="text" value={this.state.text} onChange={this.handleTextChange} />
                    <div className="radio-group" onChange={this.handleStatusChange}>
                        <div className="radio-button">
                            <input
                                type="radio"
                                value="incomplete"
                                id="incomplete"
                                name="status"
                                defaultChecked={this.state.status == "incomplete" ? "checked" : undefined}
                            />
                            <label htmlFor="incomplete">Incomplete</label>
                        </div>
                        <div className="radio-button">
                            <input
                                type="radio"
                                value="complete"
                                id="complete"
                                name="status"
                                defaultChecked={this.state.status == "complete" ? "checked" : undefined}
                            />
                            <label htmlFor="complete">Complete</label>
                        </div>
                    </div>
                    <button className="button" onClick={this.handleSubmit}>Submit</button>
                </form>
                <button className="button button--secondary" onClick={this.handleDelete}>Delete Todo</button>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    token: state.auth.token,
    selectedTodo: state.todos.filter((todo) => todo._id == props.match.params.id)[0]
});

const mapDispatchToProps = (dispatch) => ({
    startUpdateTodo: (text, token) => dispatch(startUpdateTodo(text, token)),
    startDeleteTodo: (id, token) => dispatch(startDeleteTodo(id, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);