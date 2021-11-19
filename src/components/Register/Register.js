// React, Hooks
import { useState, useEffect } from 'react';
import useAuthForm from '../../hooks/useAuthForm';

// Services
import validate from '../../services/validationServices';

// CSS
import style from './Register.module.css';

// import Notification from '../Notification/Notification';

const Register = ({ history }) => {
    const {
        formValue,
        handleInputChange,
        handleFormSubmit,
        isSubmitting,
        formErrors,
        isSuccess
    } = useAuthForm(validate, 'register');

    const [notification, setNotification] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        if (isSuccess) history.push('/login');
    }, [isSuccess])

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

                <label htmlFor="rePassword">Repeat Passoword:</label>
                <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    placeholder="Enter your password again"
                    value={formValue.rePassword}
                    onChange={handleInputChange}
                />

                <button
                    onClick={handleFormSubmit}
                    className={style.submitBtn}
                    type="submit"
                    disabled={isSubmitting}
                >
                    Register
                </button>
            </form>

        </>
    )

}

export default Register;