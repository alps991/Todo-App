import React from 'react';
import axios from 'axios';

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
        let url;
        if (this.state.status == "login") {
            url = 'https://todos-alps.herokuapp.com/users/login';
        } else if (this.state.status == "register") {
            url = 'https://todos-alps.herokuapp.com/users/';
        }
        axios({
            method: 'post',
            url,
            data: {
                email: this.state.email,
                password: this.state.password
            }
        }).then((res) => {
            this.setState({ email: '', password: '' });
            console.log(res);
        }).catch((err) => {
            console.log(err.response.status);
        });
    }

    render() {
        return (
            <div>
                <h2>Please login</h2>
                <button className="button" onClick={() => this.setState({ status: 'register' })}>Register</button>
                <button className="button" onClick={() => this.setState({ status: 'login' })}>Login</button>
                <form className="form">
                    Email: <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                    Password: <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;
