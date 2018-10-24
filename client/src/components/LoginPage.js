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
                {this.state.status == "login" ? (
                    <div>
                        <h2>Please login</h2>
                        <p>Need to register an account?</p>
                        <button
                            className={this.state.status == "register" ? "button button--selected" : "button"}
                            onClick={() => this.setState({ status: 'register' })}
                        >Register
                        </button>
                    </div>
                ) : (
                        <div>
                            <h2>Please enter a valid email and password greater than 6 characters below.</h2>
                            <p>Already have an account?</p>
                            <button
                                className={this.state.status == "login" ? "button button--selected" : "button"}
                                onClick={() => this.setState({ status: 'login' })}
                            >Login
                            </button>
                        </div>
                    )}
                <form className="form">
                    <input
                        className="text-input"
                        placeholder="Email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleEmailChange}
                    />
                    <input
                        className="text-input"
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                    />
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
