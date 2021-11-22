
// React, Hooks
import { useContext, useEffect, useState } from 'react';

// Context
import AuthContext from '../../context/authContext';

// Components
import Article from '../Article/Article';
import Comment from '../Comment/Comment';

// Services
import authServices from '../../services/authServices';
import postServices from '../../services/postServices';

// CSS
import style from './Profile.module.css';

// Other
import firebase from '../../config/firebase.js';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-solid-svg-icons'


const Profile = ({ history }) => {
    const user = useContext(AuthContext)

    const [articles, setArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const [updateParent, setUpdateParent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const deleteProfileHandler = () => {
        const currentUser = firebase.auth().currentUser;

        currentUser.delete()
            .then(function () {
                localStorage.removeItem('user');
                history.push('/');
            }).catch(err => console.log(err));
    }

    const updateParentHandler = () => {
        setUpdateParent(true)
    }

    const showProfileActivitiesHandler = () => {
        setIsLoading(true);

        postServices.getProfileVisitedPlaces(user.info.uid)
            .then(activitiesInfo => {
                setArticles(activitiesInfo)
                setComments([])
                setIsLoading(false);
            })
            .catch(err => console.log(err))

    }

    const showProfileCommentsHandler = () => {
        setIsLoading(true);

        postServices.getProfileComments(user.info.uid)
            .then(commentsData => {
                setArticles([]);
                setComments(commentsData)
                setIsLoading(false);
            })
            .catch(err => console.log(err))

    }


    // RE-FETCH ACTIVITY AFTER LIKING/DISLIKING
    useEffect(() => {
        setIsLoading(true);

        const currentUser = authServices.getUserData('user')

        postServices.getProfileVisitedPlaces(currentUser.uid)
            .then(activitiesInfo => {
                setArticles(activitiesInfo);
                setUpdateParent(false);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }, [updateParent])


    return (
        <div className={style.main}>

            <div className={style.profileContainer}>
                <h3>{user.info.email}`s Profile Page</h3>
                <button className={style.deleteProfile} onClick={deleteProfileHandler}>DELETE PROFILE</button>

                <ul className={style.userControls}>
                    <li onClick={showProfileActivitiesHandler}>{user.info.email}`s Visited Places &#9660;</li>
                    <li onClick={showProfileCommentsHandler}>{user.info.email}`s Latest Comments &#9660;</li>
                </ul>

                {isLoading && <FontAwesomeIcon icon={faCompass} className={style.spinner} spin />}

                {(!isLoading && articles.length > 0)
                    && articles.map(activity =>
                        <Article
                            key={activity.id}
                            activitiesInfo={activity}
                            updateParent={updateParentHandler}
                        />
                    )
                }

                {(!isLoading && comments.length > 0)
                    && comments.map((comment, index) =>
                        <Comment
                            key={index}
                            commentInfo={comment}
                            updateParent={updateParentHandler}
                        />
                    )
                }

            </div>
        </div >
    )

}


export default Profile;