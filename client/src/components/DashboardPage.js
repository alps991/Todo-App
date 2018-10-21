import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import LoginPage from './LoginPage';
import TodoPage from './TodoPage';

class DashboardPage extends React.Component {

  render() {
    let currPage;
    if (!this.props.loggedIn) {
      currPage = <LoginPage />;
    } else {
      currPage = <LoginPage />;
    }

    return (
      <div className="dashboard-page">
        <h1>This is the todo app dashboard</h1>
        {currPage}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(DashboardPage);
