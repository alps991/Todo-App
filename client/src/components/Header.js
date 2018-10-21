import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>To-do App</h1>
        </Link>
        {props.loggedIn ? <button className="button button--link" onClick={() => {
          axios({
            method: 'delete',
            url: 'https://todos-alps/herokuapp.com/users/me/token'
          }).then((res) => {
            props.login();
            console.log(res);
          }).catch((err) => {
            console.log(err);
          });
        }}>Logout</button> : undefined}
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);