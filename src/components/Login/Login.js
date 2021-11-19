// React, Hooks
import { useContext, useState, useEffect } from 'react';
import useAuthForm from '../../hooks/useAuthForm';

// Context
import AuthContext from '../../context/authContext';

// Components
import Notification from '../Notification/Notification';

// Services
import authServices from '../../services/authServices';
import validate from '../../services/validationServices';
// import notificationServices from '../../services/notificationServices';

// CSS
import style from './Login.module.css';

const Login = ({ history }) => {
    const user = useContext(AuthContext);

    const {
        formValue,
        handleInputChange,
        handleFormSubmit,
        isSubmitting,
        formErrors,
        isSuccess
    } = useAuthForm(validate);

    const [notification, setNotification] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        if (isSuccess) history.push('/');
    }, [isSuccess])

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
                    value={formValue.username}
                    onChange={handleInputChange}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formValue.password}
                    onChange={handleInputChange}
                />

                <button
                    onClick={handleFormSubmit}
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