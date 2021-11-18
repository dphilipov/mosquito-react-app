// React, Hooks
import { useContext, useState } from 'react';

// Context
import AuthContext from '../../context/authContext';

// Components
import Notification from '../Notification/Notification';

// Services
import authServices from '../../services/authServices';
// import notificationServices from '../../services/notificationServices';

// CSS
import style from './Login.module.css';

// Other
import firebase from '../../config/firebase.js';

const Login = ({ history }) => {
    const user = useContext(AuthContext);

    const [loginCredentials, setLoginCredentials] = useState({
        username: '',
        password: ''
    });
    const [notification, setNotification] = useState({
        type: '',
        message: ''
    });

    const inputHandler = (e) => {
        setLoginCredentials(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const { username, password } = loginCredentials;

        setNotification({
            notification: {
                type: '',
                message: ''
            }
        });

        firebase
            .auth()
            .signInWithEmailAndPassword(username, password)
            .then((userCredentials) => {
                authServices.saveUserData(userCredentials);

                const type = "good";
                const message = "Login successful!"

                // notificationServices.notificationsHandler.call(this, type, message)
            })
            .then(res => {
                user.checkIfLogged();
                history.push("/")
            })
            .catch((error) => {
                let type = "bad";
                let message = error.message;

                // notificationServices.notificationsHandler.call(this, type, message)

            });

    }

    return (

        <>
            {/* {notification.type !== ''
                ? <Notification type={notification.type} message={notification.message} />
                : ''
            } */}

            <h3>Member Login</h3>

            <form className={style.loginForm}>

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your email adress"
                    value={loginCredentials.username}
                    onChange={inputHandler}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={loginCredentials.password}
                    onChange={inputHandler}
                />

                <button
                    onClick={submitHandler}
                    className={style.submitBtn}
                    type="submit"
                >
                    Login
                </button>
            </form>
        </>
    )

}

export default Login;