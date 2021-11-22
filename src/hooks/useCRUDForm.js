// React, Hooks
import { useState, useCallback } from 'react';

// Services & Helpers
import authServices from '../services/authServices';
import postServices from '../services/postServices';

// Other
import firebase from '../config/firebase';

function useCRUDForm(validate) {
    const initialFormState = {
        title: '',
        imgUrl: '',
        description: '',
        creator: authServices.getUserData().uid,
        visited: [],
        comments: [],
        lat: '',
        lng: '',
        timestamp: 0
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState(null);
    const [formValue, setFormValue] = useState(initialFormState);


    const handleInputChange = (e) => {
        if (e.target.name === 'visited') {
            if (e.target.checked === true) {
                let userId = authServices.getUserData().uid;
                let newVisited = formValue.visited;
                newVisited.push(userId);

                setFormValue(prevState => ({
                    ...prevState,
                    [e.target.name]: newVisited,
                }))

                return;
            }

            setFormValue(prevState => ({
                ...prevState,
                [e.target.name]: [],
            }))

            return;
        }

        setFormValue(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const placeToCreate = {
            ...formValue,
            lat: Number(formValue.lat),
            lng: Number(formValue.lng),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        if (validate.CRUD(formValue)) {
            setFormErrors(validate.CRUD(formValue));
            setIsSubmitting(false);
            return;
        }

        try {
            const checkResult = await postServices.checkIfPlaceExists(formValue.title);

            if (checkResult) {
                // setNotification({
                //     type: "bad",
                //     messagetype: "This place already exists"
                // })

                return;
            }

            const response = await postServices.createArticle(placeToCreate);

            if (response.id) {
                setIsSuccess(true);
            }
        } catch (err) {
            setFormErrors(err.message);
        } finally {
            resetForm();
        }
    }

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const placeToEdit = {
            ...formValue,
            lat: Number(formValue.lat),
            lng: Number(formValue.lng),
        }

        if (validate.CRUD(formValue)) {
            setFormErrors(validate.CRUD(formValue));
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await postServices.editArticle(placeToEdit);

            if (response === 'success') {
                setIsSuccess(true);
            }
        } catch (err) {
            setFormErrors(err.message);
        } finally {
            resetForm();
        }
    }

    const setInitialValuesOnEdit = useCallback(async (articleId) => {
        try {
            const response = await postServices.getOne(articleId);

            setFormValue(response)
        } catch (err) {
            setFormErrors(err.message);
        }
    }, [])

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
        handleEditFormSubmit,
        setInitialValuesOnEdit,
        isSubmitting,
        formErrors,
        isSuccess
    };
}

export default useCRUDForm
