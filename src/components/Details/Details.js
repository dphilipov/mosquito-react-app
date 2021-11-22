// React, Hooks
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import AuthContext from '../../context/authContext';

// Servicesm Helpers
import postServices from '../../services/postServices';

// Components
import Comment from '../Comment/Comment';

// CSS
import style from './Details.module.css';

// Other
import firebase from '../../config/firebase.js';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const DB = firebase.firestore();

const Details = ({ match, history }) => {
    const user = useContext(AuthContext)

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

    const articleId = match.params.id;

    useEffect(() => {
        postServices
            .getOne(articleId)
            .then(res => {
                setArticleData(res)
            })
            .catch(err => console.log(err));
    }, [articleId]);

    const commentHandler = async (e) => {
        e.preventDefault();

        setNotificationType('');
        setNotificationMessage('');

        const postDate = new Date().toLocaleDateString('bg-BG', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
        const commentData = {
            comment: input,
            date: postDate,
            user: user.info.email,
            userId: user.info.uid
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
                comments: firebase.firestore.FieldValue.arrayUnion(commentData),
                commentsUserIds: firebase.firestore.FieldValue.arrayUnion(commentData.userId)
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

                    {articleData.creator === user.info.uid
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

            {user.isLogged
                && <form className={style.commentForm}>
                    <textarea
                        type="text"
                        name="comment"
                        placeholder="Write your comment..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    ></textarea>

                    <input
                        type="submit"
                        name="Submit"
                        value="SUBMIT COMMENT"
                        onClick={(e) => commentHandler(e)}
                    />
                </form>
            }

        </div>
    )

}


export default Details;