import React from 'react';
import axios from 'axios';

class DashboardPage extends React.Component {

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://todos-alps.herokuapp.com/users',
      data: {
        email: 'Fred',
        password: 'Flintstone'
      }
    });
  }

  render() {
    return (
      <div className="dashboard-page">
        This is the todo app dashboard.
        <form className="form">
          Email: <input type="text" />
          Password: <input type="password" />
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default DashboardPage;
