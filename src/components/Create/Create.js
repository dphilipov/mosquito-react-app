// React, Hooks
import { Component, useState } from 'react';
import { Link } from 'react-router-dom'

// Services, Helpers
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';
// import notificationServices from '../../services/notificationServices';
import { dtFormat } from '../../helpers/dateFormat';

// Components
import Notification from '../Notification/Notification';

// CSS
import style from './Create.module.css';

// Other
import firebase from '../../config/firebase.js';

const DB = firebase.firestore();

const Create = ({ history }) => {
    const [placeInfo, setPlaceInfo] = useState({
        title: '',
        imgUrl: '',
        description: '',
        dateCreated: '',
        creator: authServices.getUserData().uid,
        visited: [],
        comments: [],
        lat: null,
        lng: null,
        timestamp: 0
    })

    const [notification, setNotification] = useState({
        type: '',
        message: ''
    });

    const inputHandler = (e) => {
        if (e.target.name === 'visited') {
            if (e.target.checked === true) {
                let userId = authServices.getUserData().uid;
                let newVisited = placeInfo.visited;
                newVisited.push(userId);

                setPlaceInfo(prevState => ({
                    ...prevState,
                    [e.target.name]: newVisited,
                }))

                return;
            }

            setPlaceInfo(prevState => ({
                ...prevState,
                [e.target.name]: [],
            }))

            return;
        }

        setPlaceInfo(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))

    }

    const submitHandler = (e) => {
        e.preventDefault();

        setPlaceInfo(prevState => ({
            ...prevState,
            dateCreated: dtFormat.format(new Date()),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }))


        const placeToCreate = {
            ...placeInfo,
            lat: Number(placeInfo.lat),
            lng: Number(placeInfo.lng)
        }


        if (placeToCreate.title === ``) {
            setNotification({
                type: "bad",
                messagetype: "Title can't be empty"
            })

            // notificationServices.notificationsHandler.call(this, type, message)

            return
        }

        if (placeToCreate.imgUrl === ``) {
            setNotification({
                type: "bad",
                messagetype: "Image URL can't be empty"
            })

            // notificationServices.notificationsHandler.call(this, type, message)

            return
        }

        if (placeToCreate.lat === `` || isNaN(Number(placeToCreate.lat))) {
            setNotification({
                type: "bad",
                messagetype: "Latitude can't be empty and must be a number"
            })

            // notificationServices.notificationsHandler.call(this, type, message)

            return
        }

        if (placeToCreate.lng === `` || isNaN(Number(placeToCreate.lng))) {
            setNotification({
                type: "bad",
                messagetype: "Longitude can't be empty and must be a number"
            })

            // notificationServices.notificationsHandler.call(this, type, message)

            return
        }

        if (placeToCreate.description === ``) {
            setNotification({
                type: "bad",
                messagetype: "Description can't be empty"
            })

            // notificationServices.notificationsHandler.call(this, type, message)

            return
        }

        if (placeToCreate.description.length < 50) {
            setNotification({
                type: "bad",
                messagetype: "Description must be at least 50 characters"
            })

            // notificationServices.notificationsHandler.call(this, type, message)

            return
        }

        postServices.checkIfPlaceExists(placeInfo.title)
            .then(res => {
                if (res) {
                    setNotification({
                        type: "bad",
                        messagetype: "This place already exists"
                    })

                    return;
                }

                DB.collection(`test`)
                    .add(placeToCreate)
                    .then((res) => {

                        let type = "good";
                        let message = "Place created successfully!"

                        // notificationServices.notificationsHandler.call(this, type, message)

                        setTimeout(() => {
                            history.push('/');
                        }, 2000)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })

    }

    return (
        <>

            {/* {this.state.notification.type !== ''
                    ? <Notification type={this.state.notification.type} message={this.state.notification.message} />
                    : ''
                } */}

            <h3 className={style.createHeading}>Create a new place!</h3>
            <p className={style.hint}>
                You use a website like <Link to={{ pathname: "https://www.latlong.net" }} target="_blank">https://www.latlong.net</Link> for the coordinates
            </p>

            <form className={style.createForm}>

                <label htmlFor="title">Title:*</label>
                <input
                    type="text"
                    name="title"
                    value={placeInfo.title}
                    placeholder="Title of the place"
                    onChange={inputHandler} />

                <label htmlFor="imgUrl">Image Photo:*</label>
                <input
                    type="text"
                    name="imgUrl"
                    value={placeInfo.imgUrl}
                    placeholder="Enter URL here"
                    onChange={inputHandler} />

                <label htmlFor="lat">Latitude:*</label>
                <input
                    type="text"
                    name="lat"
                    value={placeInfo.lat}
                    placeholder="Enter place latitude (e.g. 42.144920)"
                    onChange={inputHandler} />

                <label htmlFor="lng">Longitude:*</label>
                <input
                    type="text"
                    name="lng"
                    value={placeInfo.lng}
                    placeholder="Enter place longitude (e.g. 24.750320)"
                    onChange={inputHandler} />

                <label htmlFor="description">Description:*</label>
                <textarea
                    type="text"
                    name="description"
                    value={placeInfo.description}
                    minLength="50"
                    maxLength="500"
                    placeholder="Enter a description (min. 50 characters)"
                    onChange={inputHandler}
                >
                </textarea>

                <input
                    type="checkbox"
                    id="visited"
                    name="visited"
                    value="Visited"
                    onChange={inputHandler}
                />
                <label htmlFor="visited">Visited</label>

                <p className={style.mandatory}>* are mandatory</p>
                <input
                    onClick={submitHandler}
                    type="submit"
                    name="Create"
                    value="Create"
                />
            </form>
        </>
    )
}

export default Create;

