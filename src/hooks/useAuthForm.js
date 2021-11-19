// React, Hooks
import { useState } from 'react';

// Services & Helpers
import authServices from '../services/authServices';

function useAuthForm(validate, operation) {
    const initialFormState = {
        username: '',
        password: '',
        rePassword: ''
    }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState(null);
    const [formValue, setFormValue] = useState(initialFormState);


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormValue(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);

        if (validate(formValue)) {
            setFormErrors(validate(formValue));
            setIsSubmitting(false);
            return;
        }

        try {
            let response = undefined;
            switch (operation) {
                case 'login':
                    response = await authServices.login(formValue);
                    authServices.saveUserData(response);
                    break;

                case 'register':
                    response = await authServices.register(formValue);
                    break;

                default:
                    break;
            }

            if (response.user) {
                setIsSuccess(true);
            }
        } catch (err) {
            setFormErrors(err.message);
        } finally {
            resetForm();
        }
    }

    const resetForm = () => {
        setFormErrors(null);
        setIsSubmitting(false);
        setIsSuccess(false);
        setFormValue(initialFormState);
    }

    return {
        formValue,
        handleInputChange,
        handleFormSubmit,
        isSubmitting,
        formErrors,
        isSuccess
    };
}

export default useAuthForm
