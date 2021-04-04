import firebase from '../../config/firebase.js';
import style from './Edit.module.css';
import { Component } from 'react';
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';
import Notification from '../Notification/Notification';
import notificationServices from '../../services/notificationServices';

const DB = firebase.firestore();


class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            imgUrl: '',
            description: '',
            dateCreated: '',
            visited: [],
            notification: {
                type: '',
                message: ''
            }
        }
    }

    inputHandler = (event) => {
        if (event.target.name === 'visited') {
            if (event.target.checked === true) {
                let userId = authServices.getUserData().uid;
                let newVisited = this.state.visited;
                newVisited.push(userId)
                this.setState({
                    [event.target.name]: newVisited,
                });
            } else {
                this.setState({
                    [event.target.name]: [],
                });
            }

        } else {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }

    }

    editHandler = (event) => {
        event.preventDefault();

        let articleId = this.props.match.params.id;

        this.setState({
            notification: {
                type: '',
                message: ''
            }
        });


        let { title, imgUrl, description } = this.state;

        if (title == ``) {
            let type = "bad";
            let message = "Title can't be empty"

            notificationServices.notificationsHandler.call(this, type, message)

            return
        }

        if (imgUrl == ``) {
            let type = "bad";
            let message = "Image URL can't be empty"

            notificationServices.notificationsHandler.call(this, type, message)

            return

        }

        if (description == ``) {
            let type = "bad";
            let message = "Description can't be empty"

            notificationServices.notificationsHandler.call(this, type, message)

            return

        }

        if (description.length < 50) {
            let type = "bad";
            let message = "Description must be at least 50 characters"

            notificationServices.notificationsHandler.call(this, type, message)

            return

        }

        DB.collection(`test`)
            .doc(articleId)
            .set(this.state)
            .then((res) => {
                this.props.history.push(`/article/${articleId}`);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        let articleId = this.props.match.params.id;

        postServices.getOne(articleId)
            .then(res => {
                this.setState(res)
            })
            .catch(err => console.log(err));
    }

    render() {
        let { title, imgUrl, description, visited } = this.state;

        let checkedStatus = visited.length > 0 ? true : false;

        return (

            <>
                {this.state.notification.type !== ''
                    ? <Notification type={this.state.notification.type} message={this.state.notification.message} />
                    : ''
                }

                <h3 className={style.editHeading}>Edit this place</h3>

                <form className={style.createForm}>

                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Title of the place"
                        onChange={this.inputHandler} />

                    <label htmlFor="imgUrl">Image Photo:</label>
                    <input
                        type="text"
                        name="imgUrl"
                        value={imgUrl}
                        placeholder="Enter URL here"
                        onChange={this.inputHandler} />

                    <label htmlFor="description">Description:</label>
                    <textarea
                        type="text"
                        name="description"
                        value={description}
                        onChange={this.inputHandler}
                    >
                    </textarea>

                    <input
                        type="checkbox"
                        id="visited"
                        name="visited"
                        value="Visited"
                        checked={checkedStatus}
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="visited">Посетен</label>

                    <input onClick={this.editHandler} type="submit" name="Edit" value="Edit" />
                </form>
            </>
        )
    }

}

export default Edit;

