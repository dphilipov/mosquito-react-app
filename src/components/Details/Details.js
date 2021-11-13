// React, Hooks
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Context
import { UserConsumer } from '../userContext';

// Services
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';

// Components
import Comment from '../Comment/Comment';
import Notification from '../Notification/Notification';

// CSS
import style from './Details.module.css';

// Other
import { dtFormat } from '../../helpers/dateFormat';
import firebase from '../../config/firebase.js';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const DB = firebase.firestore();

const Details = ({ match, history }) => {
    const [articleData, setArticleData] = useState({
        title: '',
        imgUrl: '',
        creator: '',
        description: '',
        dateCreated: '',
        visited: [],
        commentsUserIds: [],
        comments: [],
        lat: 0,
        lng: 0
    });
    const [input, setInput] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    let user = undefined;

    if (authServices.getUserData()) {
        user = authServices.getUserData().uid;
    }

    const articleId = match.params.id;

    useEffect(() => {
        postServices
            .getOne(articleId)
            .then(res => {
                setArticleData(res)
            })
            .catch(err => console.log(err));
    }, [articleId]);

    const commentHandler = async (e, userEmail) => {
        e.preventDefault();

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
                        setArticleData(res)
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
                        setArticleData(res)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
    }

    const deleteHandler = () => {
        DB.collection(`test`)
            .doc(articleId)
            .delete()
            .then((res) => {
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className={style.container}>
            <h3>{articleData.title}</h3>

            <div className={style.pointOfInterestDetails}>
                <div className={style.pointOfInterestDetailsTop}>

                    <img src={articleData.imgUrl} alt="" />

                </div>

                <div className={style.pointOfInterestDetailsContent} >
                    <p>{articleData.description}</p>

                    {articleData.creator === user
                        ?
                        <div className={style.buttons}>
                            <Link to={{
                                pathname: `/article/${articleId}/edit`,
                                articleProps: articleData
                            }}>
                                <button>
                                    <FontAwesomeIcon icon={faPen} className={style.icon} />
                                    EDIT
                                </button>
                            </Link>

                            <button onClick={deleteHandler}>
                                <FontAwesomeIcon icon={faTrash} className={style.icon} />
                                DELETE
                            </button>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>

            <h3>Comments:</h3>

            {(articleData.comments.length === 0)
                ? <div className={style.noComments}>
                    <p>No comments yet.</p>
                </div>
                : articleData.comments.map((comment, index) => (
                    <Comment key={index} commentInfo={comment} />
                ))
            }

            {notificationType !== ''
                ? <Notification type={notificationType} message={notificationMessage} />
                : ''
            }

            {user
                && <form className={style.commentForm}>
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
                                        onClick={(event) => commentHandler(event, userCheck.email)}
                                    />
                                )
                            }

                        }

                    </UserConsumer>

                </form>
            }

        </div>
    )

}


export default Details;