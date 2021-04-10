import firebase from '../../config/firebase.js';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
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

    submitHandler = async (event) => {
        event.preventDefault();

        await this.setState({
            notification: {
                type: '',
                message: ''
            }
        });
        
        let { username, password } = this.state;

        auth.signInWithEmailAndPassword(username, password)
            .then((userCredentials) => {
                authServices.saveUserData(userCredentials);
                this.props.action();

                let type = "good";
                let message = "Login successful!"

                notificationServices.notificationsHandler.call(this, type, message)

                setTimeout(() => {
                    this.props.history.push('/');

                }, 2000)
            })
            .catch((error) => {
                let type = "bad";
                let message = error.message;

                notificationServices.notificationsHandler.call(this, type, message)

            });

    }

    render() {
        let { username, password } = this.state;
        
        return (

            <>
                {this.state.notification.type !== ''
                    ? <Notification type={this.state.notification.type} message={this.state.notification.message} />
                    : ''
                }

                <h3>Member Login</h3>

                <form className={style.loginForm}>

                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter your email adress"
                        value={username}
                        onChange={this.inputHandler}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
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