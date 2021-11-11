// React, Hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import Notification from '../Notification/Notification';

// CSS
import style from './Edit.module.css';

// Services
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';
import notificationServices from '../../services/notificationServices';

import firebase from '../../config/firebase.js';

const DB = firebase.firestore();


const Edit = ({ match, history }) => {
    const [formData, setFormData] = useState({
        title: '',
        imgUrl: '',
        description: '',
        dateCreated: '',
        visited: []
    })

    const [notification, setNotification] = useState({
        type: '',
        message: ''
    });

    const inputHandler = (e) => {
        if (e.target.name === 'visited') {
            if (e.target.checked === true) {
                const userId = authServices.getUserData().uid;
                const newVisited = this.state.visited;
                newVisited.push(userId)
                this.setState({
                    [e.target.name]: newVisited,
                });
            } else {
                this.setState({
                    [e.target.name]: [],
                });
            }

        }

        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

    }

    const editHandler = async (e) => {
        e.preventDefault();

        let articleId = match.params.id;

        // await this.setState({
        //     notification: {
        //         type: '',
        //         message: ''
        //     }
        // });


        let { title, imgUrl, description } = formData;

        if (title === ``) {
            let type = "bad";
            let message = "Title can't be empty"

            return
        }

        if (imgUrl === ``) {
            let type = "bad";
            let message = "Image URL can't be empty"

            return

        }

        if (description === ``) {
            let type = "bad";
            let message = "Description can't be empty"

            return

        }

        if (description.length < 50) {
            let type = "bad";
            let message = "Description must be at least 50 characters"

            return

        }

        DB.collection(`test`)
            .doc(articleId)
            .set(formData)
            .then((res) => {
                history.push(`/article/${articleId}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        const articleId = match.params.id;

        postServices
            .getOne(articleId)
            .then(res => {
                setFormData(res)
            })
            .catch(err => console.log(err));
    }, [])

    return (

        <>
            {/* {notification.type !== ''
                ? <Notification type={notification.type} message={notification.message} />
                : ''
            } */}

            <h3 className={style.editHeading}>Edit this place</h3>
            <p className={style.hint}>
                You can use a website like <Link to={{ pathname: "https://www.latlong.net/" }} target="_blank" rel="noreferrer">https://www.latlong.net/</Link> for the coordinates
            </p>

            <form className={style.createForm}>

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    placeholder="Title of the place"
                    onChange={inputHandler} />

                <label htmlFor="imgUrl">Image Photo:</label>
                <input
                    type="text"
                    name="imgUrl"
                    value={formData.imgUrl}
                    placeholder="Enter URL here"
                    onChange={inputHandler} />

                <label htmlFor="lat">Latitude:*</label>
                <input
                    type="number"
                    name="lat"
                    value={formData.lat}
                    placeholder="Enter place latitude (e.g. 42.144920)"
                    onChange={inputHandler} />

                <label htmlFor="lng">Longitude:*</label>
                <input
                    type="number"
                    name="lng"
                    value={formData.lng}
                    placeholder="Enter place longitude (e.g. 24.750320)"
                    onChange={inputHandler} />

                <label htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={inputHandler}
                >
                </textarea>

                <input
                    type="checkbox"
                    id="visited"
                    name="visited"
                    value="Visited"
                    checked={formData.visited.length > 0 ? true : false}
                    onChange={inputHandler}
                />
                <label htmlFor="visited">Visited</label>

                <button
                    onClick={editHandler}
                    className={style.submitBtn}
                    type="submit"
                >EDIT</button>
            </form>
        </>
    )

}

export default Edit;

