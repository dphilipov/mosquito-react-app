import style from './Details.module.css';
import { useEffect, useState } from 'react';
import Comment from '../Comment/Comment';
import postServices from '../../services/postServices';

const Details = ({ match }) => {
    let [article, setArticle] = useState({});
    let petId = match.params.id;

    useEffect(() => {
        postServices.getOne(petId)
            .then(res => {
                setArticle(res)
            })
            .catch(err => console.log(err));
    }, [match]);

    return (
        <div className={style.container}>
            <div className={style.pointOfInterestDetails}>
                <div className={style.pointOfInterestDetailsTop}>
                    <img src={article.imgUrl} alt="Image Preview" />
                    <div className={style.buttons}>
                        <button>DELETE</button>
                        <button>EDIT</button>
                    </div>
                </div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
            </div>

            <h2>Comments:</h2>

            {(article.comments == undefined || article.comments.length == 0) ?
                <div className={style.noComments}>
                    <p>No comments yet. Be the first one to do it!</p>
                </div>
                :
                article.comments.map((comment, index) => (
                    <Comment key={index} commentInfo={comment} />
                ))
            }

            <form className={style.commentForm}>
                <textarea
                    type="text"
                    name="comment"
                    placeholder="Write your comment..."
                    value=""
                ></textarea>

                <input type="submit" name="Submit" value="Submit" />

            </form>

        </div>
    )

}


export default Details;