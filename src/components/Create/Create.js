import firebase from '../../config/firebase.js';
import style from './Create.module.css';
import { Component } from 'react';
import { dtFormat } from '../../config/dateFormat';
import authServices from '../../services/authServices';

const DB = firebase.firestore();


class Create extends Component {
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

    submitHandler = async (event) => {
        event.preventDefault();
        await this.setState({
            dateCreated: dtFormat.format(new Date()),
        })

        DB.collection(`test`)
            .add(this.state)
            .then((res) => {
                this.props.history.push('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        let { title, imgUrl, description } = this.state;

        return (
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
                    onChange={this.inputHandler}
                />
                <label htmlFor="visited">Посетен</label>

                <input onClick={this.submitHandler} type="submit" name="Create" value="Create" />
            </form>
        )
    }

}

export default Create;

