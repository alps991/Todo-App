import React from 'react';
import axios from 'axios';
import LoginPage from './LoginPage';

class DashboardPage extends React.Component {

  render() {
    return (
      <div className="dashboard-page">
        <h1>This is the todo app dashboard</h1>
        <LoginPage />
      </div>
    );
  }
}

export default DashboardPage;
