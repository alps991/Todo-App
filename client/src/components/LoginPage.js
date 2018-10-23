import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startRegister } from '../actions/auth';

class LoginPage extends React.Component {

    state = {
        email: '',
        password: '',
        status: 'login'
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.status == "login") {
            this.props.startLogin(this.state.email, this.state.password);
        } else if (this.state.status == "register") {
            this.props.startRegister(this.state.email, this.state.password);
        }
    }

    render() {
        return (
            <div className="content-container">
                <h2>Please login</h2>
                <button className="button" onClick={() => this.setState({ status: 'register' })}>Register</button>
                <button className="button" onClick={() => this.setState({ status: 'login' })}>Login</button>
                <form className="form">
                    Email: <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                    Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <button className="button" onClick={this.handleSubmit}>Submit</button>
                </form>
                <button onClick={() => this.setState({ email: 'example@example.com', password: 'Aaolaaol1' })}>Example</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogin: (email, password) => dispatch(startLogin(email, password)),
    startRegister: (email, password) => dispatch(startRegister(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
