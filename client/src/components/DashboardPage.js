import React from 'react';
import { connect } from 'react-redux';
import { startGetTodos } from '../actions/todos';
import TodoList from './TodoList';
import TodoSummary from './TodoSummary';

class DashboardPage extends React.Component {

  constructor(props) {
    super(props);
    this.props.startGetTodos(this.props.token);
  }

  render() {
    if (!this.props.todos[0]) {
      return (
        <div className="content-container">
          <h2>You have no To-dos</h2>
        </div>
      );
    }
    return (
      <div>
        <TodoSummary />
        <TodoList todos={this.props.todos} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);