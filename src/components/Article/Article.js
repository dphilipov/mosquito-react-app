import { Link } from 'react-router-dom';
import firebase from '../../config/firebase.js';
import postServices from '../../services/postServices';
import { useState } from 'react';
import pin from './location-map-pin.svg'
import style from './Article.module.css'

const DB = firebase.firestore();

const Article = ({ articleData, updateParent}) => {
    let [visited, setVisited] = useState(articleData);

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
                    <img src={articleData.imgUrl} alt="Thumbnail" className={style.thumbnail} />
                </ Link>
            </div>
            <div>
                <h2>{articleData.title}</h2>
                <p>{articleData.description}</p>
                <span><strong>Date Added:</strong> {articleData.dateCreated}</span>
                <span>
                    {articleData.visited.length === 1
                        ? `Visited by ${articleData.visited.length} person`
                        : `Visited by ${articleData.visited.length} people`
                    }
                </span>
                <img src={pin} onClick={(event) => visitedHandler(event)} alt="Like button" className={style.pin}
                    title="Add to map" />
            </div>
        </article>
    )
}

export default Article;