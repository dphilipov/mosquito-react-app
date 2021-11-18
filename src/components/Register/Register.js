// React, Hooks
import { useContext, useState } from 'react';

// CSS
import style from './Register.module.css';

// Other
import firebase from '../../config/firebase.js';
// import Notification from '../Notification/Notification';

const Register = ({ history }) => {

    const [registerCredentials, setRegisterCredentials] = useState({
        username: '',
        password: '',
        rePassword: '',
    });
    const [notification, setNotification] = useState({
        type: '',
        message: ''
    });

    const inputHandler = (e) => {
        setRegisterCredentials(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let { username, password, rePassword } = registerCredentials;

        if (password !== rePassword) {
            let type = "bad";
            let message = "Passwords must match!"
            // notificationServices.notificationsHandler.call(this, type, message)
            return;
        }


        firebase
            .auth()
            .createUserWithEmailAndPassword(username, password)
            .then((userCredentials) => {
                setRegisterCredentials({
                    username: '',
                    password: '',
                    rePassword: '',
                });

                // let type = "good";
                // let message = "Registration successful!"

                // notificationServices.notificationsHandler.call(this, type, message)
            })
            .then(res => {
                history.push("/login")
            })
            .catch((error) => {
                // let type = "bad";
                // let message = error.message;

                // notificationServices.notificationsHandler.call(this, type, message)
            });
    }

    return (
        <>
            {/* {this.state.notification.type !== ''
                ? <Notification type={this.state.notification.type} message={this.state.notification.message} />
                : ''
            } */}

            <h3>Registration Info</h3>

            <form className={style.registerForm}>

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your email adress"
                    value={registerCredentials.username}
                    onChange={inputHandler}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={registerCredentials.password}
                    onChange={inputHandler}
                />

                <label htmlFor="rePassword">Repeat Passoword:</label>
                <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    placeholder="Enter your password again"
                    value={registerCredentials.rePassword}
                    onChange={inputHandler}
                />

                <button
                    onClick={submitHandler}
                    className={style.submitBtn}
                    type="submit"
                >
                    Register
                </button>
            </form>

        </>
    )

}

export default Register;