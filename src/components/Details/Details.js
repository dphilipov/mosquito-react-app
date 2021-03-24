import style from './Details.module.css';
import { useEffect, useState } from 'react';
import { dtFormat } from '../../config/dateFormat';
import { UserConsumer } from '../userContext';
import firebase from '../../config/firebase.js';
import Comment from '../Comment/Comment';
import postServices from '../../services/postServices';

const Details = ({ match }) => {
    let [article, setArticle] = useState({});
    let [input, setInput] = useState('');
    let [date, setDate] = useState('');

    const DB = firebase.firestore();
    let articleId = match.params.id;

    useEffect(() => {
        postServices.getOne(articleId)
            .then(res => {
                setArticle(res)
            })
            .catch(err => console.log(err));
    }, [match]);

    const SubmitHandler = async (event, userEmail) => {
        event.preventDefault();
        let postDate = dtFormat.format(new Date());
        let commentData = {
            comment: input,
            date: postDate,
            user: userEmail
        }

        await setDate(postDate);

        DB.collection(`test`)
            .doc(articleId)
            .update({
                comments: firebase.firestore.FieldValue.arrayUnion(commentData)
            })
            .then((res) => {
                setInput('');

                postServices.getOne(articleId)
                    .then(res => {
                        setArticle(res)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
    }

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

            {(article.comments == undefined || article.comments.length == 0)

                ? <div className={style.noComments}>
                    <p>No comments yet. Be the first one to do it!</p>
                </div>
                : article.comments.map((comment, index) => (
                    <Comment key={index} commentInfo={comment} />
                ))
            }

            <form className={style.commentForm}>
                <textarea
                    type="text"
                    name="comment"
                    placeholder="Write your comment..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                ></textarea>

                <UserConsumer>
                    {
                        (userCheck) => {
                            return (
                                <input
                                    type="submit"
                                    name="Submit"
                                    value="Submit"
                                    onClick={(event) => SubmitHandler(event, userCheck.email)}
                                />
                            )
                        }

                    }

                </UserConsumer>

            </form>
        </div>
    )

}


export default Details;