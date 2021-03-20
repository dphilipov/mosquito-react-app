import firebase from '../../config/firebase.js';
import style from './Create.module.css';
import { Component } from 'react';

const DB = firebase.firestore();
const dtFormat = new Intl.DateTimeFormat('bg-BG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});

class Create extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            imgUrl: '',
            description: '',
            dateCreated: '',
            // visited: Boolean
        }
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
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

                <label for="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Title"
                    onChange={this.inputHandler} />

                <label for="imgUrl">Image Photo:</label>
                <input
                    type="text"
                    name="imgUrl"
                    value={imgUrl}
                    placeholder="Enter URL here"
                    onChange={this.inputHandler} />

                <label for="description">Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.inputHandler}
                >
                </textarea>

                <input onClick={this.submitHandler} type="submit" name="Create" value="Create" />
            </form>
        )
    }

}

export default Create;

