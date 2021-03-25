import firebase from '../../config/firebase.js';
import style from './Edit.module.css';
import { Component } from 'react';
import { dtFormat } from '../../config/dateFormat';
import postServices from '../../services/postServices';
import authServices from '../../services/authServices';

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

    editHandler = async (event) => {
        event.preventDefault();
        let articleId = this.props.match.params.id;

        DB.collection(`test`)
            .doc(articleId)
            .set(this.state)
            .then((res) => {
                this.props.history.push('/');
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
                <h2>Edit this place!</h2>

                <form className={style.createForm}>

                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Title"
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

