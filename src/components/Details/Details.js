import style from './Details.module.css';
import { useHistory, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { dtFormat } from '../../config/dateFormat';
import { UserConsumer } from '../userContext';
import firebase from '../../config/firebase.js';
import Comment from '../Comment/Comment';
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';
import Notification from '../Notification/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Details = ({ match }) => {
    let [article, setArticle] = useState({});
    let [input, setInput] = useState('');
    let [notificationType, setNotificationType] = useState('');
    let [notificationMessage, setNotificationMessage] = useState('');

    let history = useHistory();
    let user = undefined;

    if (authServices.getUserData()) {
        user = authServices.getUserData().uid;
    }

    const DB = firebase.firestore();
    let articleId = match.params.id;

    useEffect(() => {
        postServices.getOne(articleId)
            .then(res => {
                setArticle(res)
            })
            .catch(err => console.log(err));
    }, [articleId]);

    const CommentHandler = async (event, userEmail) => {
        event.preventDefault();

        setNotificationType('');
        setNotificationMessage('');

        let postDate = dtFormat.format(new Date());
        let commentData = {
            comment: input,
            date: postDate,
            user: userEmail,
            userId: authServices.getUserData().uid
        }

        if (input === ``) {
            let type = "bad";
            let message = "Comment can't be empty"

            setNotificationType(type);
            setNotificationMessage(message);

            return
        }

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

        DB.collection(`test`)
            .doc(articleId)
            .update({
                commentsUserIds: firebase.firestore.FieldValue.arrayUnion(authServices.getUserData().uid)
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

    const DeleteHandler = () => {

        DB.collection(`test`).doc(articleId).delete()
            .then((res) => {
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className={style.container}>
            <h3>{article.title}</h3>

            <div className={style.pointOfInterestDetails}>
                <div className={style.pointOfInterestDetailsTop}>

                    <img src={article.imgUrl} alt="" />

                </div>

                <div className={style.pointOfInterestDetailsContent} >
                    <p>{article.description}</p>

                    {article.creator === user
                        ?
                        <div className={style.buttons}>
                            <Link to={{
                                pathname: `/article/${articleId}/edit`,
                                articleProps: article
                            }}>
                                <button>
                                    <FontAwesomeIcon icon={faPen} className={style.icon}/>
                                    EDIT
                                </button>
                            </Link>

                            <button onClick={DeleteHandler}>
                                <FontAwesomeIcon icon={faTrash} className={style.icon}/>
                                DELETE
                            </button>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>

            <h3>Comments:</h3>

            {(article.comments === undefined || article.comments.length === 0)

                ? <div className={style.noComments}>
                    <p>No comments yet.</p>
                </div>
                : article.comments.map((comment, index) => (
                    <Comment key={index} commentInfo={comment} />
                ))
            }

            {notificationType !== ''
                ? <Notification type={notificationType} message={notificationMessage} />
                : ''
            }

            {user
                ? <form className={style.commentForm}>
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
                                        value="SUBMIT COMMENT"
                                        onClick={(event) => CommentHandler(event, userCheck.email)}
                                    />
                                )
                            }

                        }

                    </UserConsumer>

                </form>
                : ''



            }

        </div>
    )

}


export default Details;