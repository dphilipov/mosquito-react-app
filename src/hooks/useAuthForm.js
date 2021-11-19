// React, Hooks
import { useState } from 'react';

// Services & Helpers
import authServices from '../services/authServices';

function useAuthForm(validate) {
    const initialFormState = {
        username: '',
        password: ''
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
            const response = await authServices.login(formValue);

            if (response.user) {
                authServices.saveUserData(response);
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
