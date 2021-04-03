import firebase from '../../config/firebase.js';
import { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import authServices from '../../services/authServices';
import Notification from '../Notification/Notification';
import notificationServices from '../../services/notificationServices';
import style from './Login.module.css';

const auth = firebase.auth();

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            notification: {
                type: '',
                message: ''
            }
        }
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        notificationServices.notificationsHandler = notificationServices.notificationsHandler.bind(this)

        let { username, password } = this.state;

        auth.signInWithEmailAndPassword(username, password)
            .then((userCredentials) => {
                authServices.saveUserData(userCredentials);
                this.props.action();
                this.props.history.push('/');
            })
            .catch((error) => {
                let type = "bad";
                let message = error.message;

                notificationServices.notificationsHandler(type, message)

            });

    }

    render() {
        let { username, password, rePassword } = this.state;

        return (

            <>
                {this.state.notification.type !== ''
                    ? <Notification type={this.state.notification.type} message={this.state.notification.message} />
                    : ''
                }

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
            </>
        )
    }

}

export default withRouter(Login);