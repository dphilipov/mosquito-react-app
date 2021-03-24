import firebase from '../../config/firebase.js';
import { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import authServices from '../../services/authServices';
import style from './Login.module.css';

const auth = firebase.auth();

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        let { username, password } = this.state;

        auth.signInWithEmailAndPassword(username, password)
            .then((userCredentials) => {
                authServices.saveUserData(userCredentials);
                this.props.action();
                this.props.history.push('/');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(`Error code: ${errorCode} > ${errorMessage}`);
            });

    }

    render() {
        let { username, password, rePassword } = this.state;

        return (
            <form className={style.loginForm}>

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.inputHandler}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.inputHandler}
                />

                <input onClick={this.submitHandler} type="submit" name="Login" value="Login" />
            </form>
        )
    }

}

export default withRouter(Login);