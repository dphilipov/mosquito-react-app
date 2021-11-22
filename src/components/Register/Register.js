// React, Hooks
import { useEffect } from 'react';
import useAuthForm from '../../hooks/useAuthForm';

// Services
import validate from '../../services/validationServices';

// CSS
import style from './Register.module.css';

const Register = ({ history }) => {
    const {
        formValue,
        handleInputChange,
        handleFormSubmit,
        isSubmitting,
        formErrors,
        isSuccess
    } = useAuthForm(validate, 'register');

    useEffect(() => {
        if (isSuccess) history.push('/login');
    }, [isSuccess, history])

    return (
        <>
            <h3>Registration Info</h3>

            <form className={style.registerForm}>

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

                <label htmlFor="rePassword">Repeat Password:</label>
                {formErrors?.noMatch && <p className={style.error}>{formErrors.noMatch}</p>}

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