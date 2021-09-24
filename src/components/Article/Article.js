import { Link } from 'react-router-dom';
import firebase from '../../config/firebase.js';
import postServices from '../../services/postServices';
import { useState } from 'react';
import style from './Article.module.css'
import authServices from '../../services/authServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const DB = firebase.firestore();

const Article = ({ articleData, updateParent }) => {
    const [visited, setVisited] = useState(articleData.visited);

    let user = undefined;

    if (authServices.getUserData()) {
        user = authServices.getUserData().uid;
    }

    const visitedHandler = (event) => {
        event.preventDefault();

        let userId = JSON.parse(localStorage.getItem('user')).uid;

        if (visited.includes(userId)) {
            DB.collection(`test`)
                .doc(articleData.id)
                .update({
                    visited: firebase.firestore.FieldValue.arrayRemove(userId)
                })
                .then((res) => {
                    postServices.getOne(articleData.id)
                        .then(res => {
                            setVisited(res.visited);
                            updateParent()
                        })
                })
                .catch(err => console.log(err))
        } else {
            DB.collection(`test`)
                .doc(articleData.id)
                .update({
                    visited: firebase.firestore.FieldValue.arrayUnion(userId)
                })
                .then((res) => {
                    postServices.getOne(articleData.id)
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
                <Link to={`/article/${articleData.id}`}>
                    <img src={articleData.imgUrl} className={style.thumbnail} alt="" />
                </ Link>
            </div>
            <div className={style.poiContent}>
                <div>
                    <div className={style.topContentContainer}>
                        <Link to={`/article/${articleData.id}`}>
                            <h2>{articleData.title}</h2>
                        </ Link>
                        <span className={style.dateAdded}><strong>Date Added:</strong> {articleData.dateCreated}</span>
                    </div>
                    <p>{articleData.description}</p>
                </div>
                <div className={style.bottomContentContainer}>
                    {user
                        ? <FontAwesomeIcon icon={faMapMarkerAlt} onClick={(event) => visitedHandler(event)} className={style.pin} />

                        : ''
                    }
                    <span className={style.visitedBy}>
                        {`Visited by ${visited.length} ${visited.length === 1 ? "person" : "people"}`}
                    </span>
                </div>
            </div>
        </article>
    )
}

export default Article;