import style from './Profile.module.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserConsumer } from '../userContext';
import firebase from '../../config/firebase.js';
import spinner from './ajax-loader.gif';
import Article from '../Article/Article';
import Comment from '../Comment/Comment';
import authServices from '../../services/authServices';
import postServices from '../../services/postServices';


const Profile = (props) => {
    const [activities, setActivities] = useState([]);
    const [comments, setComments] = useState([]);
    const [updateParent, setUpdateParent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    let history = useHistory();

    const deleteProfileHandler = () => {
        let user = firebase.auth().currentUser;

        user.delete()
            .then(function () {
                localStorage.removeItem('user');
                props.action();
                history.push('/');

            }).catch(err => console.log(err));

    }

    const updateParentHandler = () => {
        setUpdateParent(true)
    }

    const showProfileActivityHandler = () => {
        let user = authServices.getUserData('user')

        postServices.getProfileActivity(user.uid)
            .then(activitiesData => {
                setActivities(activitiesData)
                setComments([])
            })
            .catch(err => console.log(err))

    }

    const showProfileCommentsHandler = () => {

        let user = authServices.getUserData('user')

        postServices.getProfileComments(user.uid)
            .then(commentsData => {
                setComments(commentsData)
                setActivities([]);
            })
            .catch(err => console.log(err))

    }


    // RE-FETCH ACTIVITY AFTER LIKING/DISLIKING
    useEffect(() => {
        setIsLoading(true);
        let user = authServices.getUserData('user')

        postServices.getProfileActivity(user.uid, 5)
            .then(activitiesData => {
                setActivities(activitiesData);
                setUpdateParent(false);
                setIsLoading(false);
            })
            .catch(err => console.log(err))
    }, [updateParent])


    return (

        <UserConsumer>
            {
                (userCheck) => {
                    return (
                        <div className={style.main}>

                            <div className={style.profileContainer}>
                                <h3>{userCheck.email}`s Profile Page</h3>
                                <button className={style.deleteProfile} onClick={deleteProfileHandler}>DELETE PROFILE</button>

                                <ul className={style.userControls}>
                                    <li onClick={showProfileActivityHandler}>View {userCheck.email}`s Latest Activity &#9660;</li>
                                    <li onClick={showProfileCommentsHandler}>View {userCheck.email}`s Latest Comments &#9660;</li>
                                </ul>

                                {isLoading === true ?
                                    <img className={style.loader} src={spinner} alt="loader"></img>
                                    :
                                    <>
                                        {activities.length > 0
                                            ? activities.map(activity =>
                                                <Article
                                                    key={activity.id}
                                                    articleData={activity}
                                                    updateParent={updateParentHandler}
                                                />
                                            )
                                            : ''
                                        }

                                        {comments.length > 0
                                            ? comments.map((comment, index) =>
                                                <Comment
                                                    key={index}
                                                    commentInfo={comment}
                                                    updateParent={updateParentHandler}
                                                />
                                            )
                                            : ''
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    )
                }
            }

        </UserConsumer>
    )

}


export default Profile;