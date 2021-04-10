import { Link } from 'react-router-dom';
import firebase from '../../config/firebase.js';
import postServices from '../../services/postServices';
import { useState } from 'react';
import style from './Article.module.css'
import authServices from '../../services/authServices';


const DB = firebase.firestore();

const Article = ({ articleData, updateParent }) => {
    let [visited, setVisited] = useState(articleData);

    let user = undefined;

    if (authServices.getUserData()) {
        user = authServices.getUserData().uid;
    }

    const visitedHandler = (event) => {
        event.preventDefault();

        let userId = JSON.parse(localStorage.getItem('user')).uid;

        postServices.getOne(articleData.id)
            .then(targetArticle => {
                setVisited(targetArticle.visited)

                if (targetArticle.visited.includes(userId)) {
                    DB.collection(`test`)
                        .doc(targetArticle.id)
                        .update({
                            visited: firebase.firestore.FieldValue.arrayRemove(userId)
                        })
                        .then((res) => {
                            updateParent()
                        })
                        .catch(err => console.log(err))
                } else {
                    DB.collection(`test`)
                        .doc(targetArticle.id)
                        .update({
                            visited: firebase.firestore.FieldValue.arrayUnion(userId)
                        })
                        .then((res) => {
                            updateParent()
                        })
                        .catch(err => console.log(err))
                }

            })
    }

    return (
        <article className={style.pointOfInterest}>
            <div className={style.poiPreview}>
                <Link to={`/article/${articleData.id}`}>
                    <img src={articleData.imgUrl} className={style.thumbnail} alt=""/>
                </ Link>
            </div>
            <div>
                <h2>{articleData.title}</h2>
                <span className={style.dateAdded}><strong>Date Added:</strong> {articleData.dateCreated}</span>
                <p>{articleData.description}</p>
                <span className={style.visitedBy}>
                    {articleData.visited.length === 1
                        ? `Visited by ${articleData.visited.length} person`
                        : `Visited by ${articleData.visited.length} people`
                    }
                </span>
                {user
                    ? <button onClick={(event) => visitedHandler(event)} className={style.pin}>TAG AS VISITED</ button>

                    : ''
                }
            </div>
        </article>
    )
}

export default Article;