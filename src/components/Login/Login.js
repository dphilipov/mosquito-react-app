// React, Hooks
import { useEffect } from 'react';
import useAuthForm from '../../hooks/useAuthForm';

// Services
import validate from '../../services/validationServices';

// CSS
import style from './Login.module.css';

const Login = ({ history }) => {
    const {
        formValue,
        handleInputChange,
        handleFormSubmit,
        isSubmitting,
        formErrors,
        isSuccess
    } = useAuthForm(validate, 'login');

    useEffect(() => {
        if (isSuccess) history.push('/');
    }, [isSuccess, history])

    return (

        <>
            <h3>Member Login</h3>

            <form className={style.loginForm}>

                <label htmlFor="username">Username:</label>
                {formErrors?.username && <p className={style.error}>{formErrors.username}</p>}

                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter your email adress"
                    value={formValue.username}
                    onChange={handleInputChange}
                />

                <label htmlFor="password">Password:</label>
                {formErrors?.password && <p className={style.error}>{formErrors.password}</p>}

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
                    disabled={isSubmitting}
                >
                    Login
                </button>
            </form>
        </>
    )

}

export default Login;