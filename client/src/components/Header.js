import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/">
          <h1>To-do App</h1>
        </Link>
        {props.loggedIn ? <button className="button button--link" onClick={() => props.startLogout(props.token)}>Logout</button> : undefined}
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
  token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: (token) => dispatch(startLogout(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);