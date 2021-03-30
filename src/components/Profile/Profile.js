import style from './Profile.module.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserConsumer } from '../userContext';
import firebase from '../../config/firebase.js';
import Article from '../Article/Article';
import Comment from '../Comment/Comment';
import authServices from '../../services/authServices';
import postServices from '../../services/postServices';


const Profile = (props) => {
    let [newEmail, setNewEmail] = useState('');
    let [activities, setActivities] = useState([]);
    let [comments, setComments] = useState([]);
    let [updateParent, setUpdateParent] = useState(false);

    useEffect(() => {
        let user = authServices.getUserData('user')

        postServices.getProfileActivity(user.uid, 2)
            .then(activitiesData => {
                setActivities(activitiesData)
            })
            .catch(err => console.log(err))

    }, []);

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

    const updateProfileHandler = () => {

        let user = firebase.auth().currentUser;

        user.updateProfile({
            email: newEmail
        }).then(function () {
            if (user != null) {
                user.providerData.forEach(function (profile) {
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("  Provider-specific UID: " + profile.uid);
                    console.log("  Name: " + profile.displayName);
                    console.log("  Email: " + profile.email);
                    console.log("  Photo URL: " + profile.photoURL);
                });
            }
        }).catch(function (error) {
            // An error happened.
        });




    }

    const updateParentHandler = () => {
        setUpdateParent(true)
    }

    

    const showProfileCommentsHandler = () => {

        let user = authServices.getUserData('user')

        postServices.getProfileComments(user.uid, 2)
            .then(commentsData => {
                setComments(commentsData)
            })
            .catch(err => console.log(err))

    }


    // RE-FETCH ACTIVITY AFTER LIKING/DISLIKING
    useEffect(() => {
        let user = authServices.getUserData('user')

        postServices.getProfileActivity(user.uid, 2)
            .then(activitiesData => {
                setActivities(activitiesData);
                setUpdateParent(false);
            })
            .catch(err => console.log(err))
    }, [updateParent])

    
    return (

        <UserConsumer>
            {
                (userCheck) => {
                    return (
                        <div className={style.profileContainer}>
                            <h2>{userCheck.email}</h2>
                            <button onClick={deleteProfileHandler}>DELETE PROFILE</button>
                            <button onClick={updateProfileHandler}>UPDATE EMAIL</button>
                            <h3>Profile Latest Activity</h3>
                            {activities.map(activity =>
                                <Article
                                    key={activity.id}
                                    articleData={activity}
                                    updateParent={updateParentHandler}
                                />
                            )}

                            <h3 onClick={showProfileCommentsHandler}>Latest Comments</h3>
                            {comments.map((comment, index) =>
                                <Comment
                                    key={index}
                                    commentInfo={comment}
                                    updateParent={updateParentHandler}
                                />
                            )}
                        </div>
                    )
                }
            }

        </UserConsumer>
    )

}


export default Profile;