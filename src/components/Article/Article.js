// React, Hooks
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import AuthContext from '../../context/authContext';

// Services
import postServices from '../../services/postServices';

// CSS
import style from './Article.module.css'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Other
import firebase from '../../config/firebase.js';

const DB = firebase.firestore();

const Article = ({ activitiesInfo, updateParent }) => {
    const user = useContext(AuthContext)
    const dateCreated = activitiesInfo.timestamp.toDate().toLocaleDateString('bg-BG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
    const [visited, setVisited] = useState(activitiesInfo.visited);

    const toggleVisitedStatusHandler = (e) => {
        e.preventDefault();

        const userId = user.info.uid;
        const action = visited.includes(userId)
            ? { visited: firebase.firestore.FieldValue.arrayRemove(userId) }
            : { visited: firebase.firestore.FieldValue.arrayUnion(userId) };

        DB.collection(`test`)
            .doc(activitiesInfo.id)
            .update(action)
            .then((res) => {
                postServices.getOne(activitiesInfo.id)
                    .then(res => {
                        setVisited(res.visited);
                        updateParent()
                    })
            })
            .catch(err => console.log(err))
    }

    return (
        <article className={style.pointOfInterest}>
            <div className={style.poiPreview}>
                <Link to={`/article/${activitiesInfo.id}`}>
                    <img src={activitiesInfo.imgUrl} className={style.thumbnail} alt="" />
                </ Link>
            </div>

            <div className={style.poiContent}>
                <div>
                    <div className={style.topContentContainer}>
                        <Link to={`/article/${activitiesInfo.id}`}>
                            <h2>{activitiesInfo.title}</h2>
                        </ Link>
                        <span className={style.dateAdded}><strong>Date Added:</strong> {dateCreated}</span>
                    </div>
                    <p>{activitiesInfo.description}</p>
                </div>

                <div className={style.bottomContentContainer}>
                    {user && <FontAwesomeIcon icon={faMapMarkerAlt} onClick={(e) => toggleVisitedStatusHandler(e)} className={style.pin} />}
                    <span className={style.visitedBy}>
                        {`Visited by ${visited.length} ${visited.length === 1 ? "person" : "people"}`}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default Article;