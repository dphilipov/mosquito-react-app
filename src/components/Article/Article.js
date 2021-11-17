// React, Hooks
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Services
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';

// CSS
import style from './Article.module.css'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Other
import firebase from '../../config/firebase.js';

const DB = firebase.firestore();

const Article = ({ activitesInfo, updateParent }) => {
    const [visited, setVisited] = useState(activitesInfo.visited);

    let user = undefined;

    if (authServices.getUserData()) {
        user = authServices.getUserData().uid;
    }

    const visitedHandler = (event) => {
        event.preventDefault();

        const userId = JSON.parse(localStorage.getItem('user')).uid;

        if (visited.includes(userId)) {
            DB.collection(`test`)
                .doc(activitesInfo.id)
                .update({
                    visited: firebase.firestore.FieldValue.arrayRemove(userId)
                })
                .then((res) => {
                    postServices.getOne(activitesInfo.id)
                        .then(res => {
                            setVisited(res.visited);
                            updateParent()
                        })
                })
                .catch(err => console.log(err))
        } else {
            DB.collection(`test`)
                .doc(activitesInfo.id)
                .update({
                    visited: firebase.firestore.FieldValue.arrayUnion(userId)
                })
                .then((res) => {
                    postServices.getOne(activitesInfo.id)
                        .then(res => {
                            setVisited(res.visited);
                            updateParent()
                        })
                })
                .catch(err => console.log(err))
        }

    }

    return (
        <article className={style.pointOfInterest}>
            <div className={style.poiPreview}>
                <Link to={`/article/${activitesInfo.id}`}>
                    <img src={activitesInfo.imgUrl} className={style.thumbnail} alt="" />
                </ Link>
            </div>
            <div className={style.poiContent}>
                <div>
                    <div className={style.topContentContainer}>
                        <Link to={`/article/${activitesInfo.id}`}>
                            <h2>{activitesInfo.title}</h2>
                        </ Link>
                        <span className={style.dateAdded}><strong>Date Added:</strong> {activitesInfo.dateCreated}</span>
                    </div>
                    <p>{activitesInfo.description}</p>
                </div>
                <div className={style.bottomContentContainer}>
                    {user&& <FontAwesomeIcon icon={faMapMarkerAlt} onClick={(event) => visitedHandler(event)} className={style.pin} />}
                    <span className={style.visitedBy}>
                        {`Visited by ${visited.length} ${visited.length === 1 ? "person" : "people"}`}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default Article;