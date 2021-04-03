import firebase from '../../config/firebase.js';
import style from './Register.module.css';
import { Component } from 'react';
import Notification from '../Notification/Notification';
import notificationServices from '../../services/notificationServices';

const auth = firebase.auth();

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            rePassword: '',
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

        this.setState({notification: {
            type: '',
            message: ''
        }});

        let { username, password, rePassword } = this.state;

        if (password !== rePassword) {
            let type = "bad";
            let message = "Passwords must match!"

            notificationServices.notificationsHandler.call(this, type, message)

        } else {
            auth.createUserWithEmailAndPassword(username, password)
                .then((userCredentials) => {
                    this.props.history.push('/login');
                })
                .catch((error) => {
                    let type = "bad";
                    let message = error.message;

                    notificationServices.notificationsHandler.call(this, type, message)
                });
        }



    }

    render() {

        let { username, password, rePassword } = this.state;

        return (
            <>
                {this.state.notification.type !== ''
                    ? <Notification type={this.state.notification.type} message={this.state.notification.message} />
                    : ''
                }

                <form className={style.registerForm}>

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

                    <label htmlFor="rePassword">Repeat Passoword:</label>
                    <input
                        type="password"
                        name="rePassword"
                        id="rePassword"
                        placeholder="Repeat Password"
                        value={rePassword}
                        onChange={this.inputHandler}
                    />

                    <input onClick={(event) => this.submitHandler(event)} type="submit" name="Register" value="Register" />
                </form>

            </>
        )
    }

}

export default Register;