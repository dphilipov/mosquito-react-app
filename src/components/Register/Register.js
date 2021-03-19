import firebase from '../../config/firebase.js';
import style from './Register.module.css';
import { Component } from 'react';

const auth = firebase.auth();

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            rePassword: ''
        }
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        let { username, password, rePassword } = this.state;

        auth.createUserWithEmailAndPassword(username, password)
            .then((userCredential) => {
                this.props.history.push('/login');


            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(`Error code: ${errorCode} > ${errorMessage}`);
            });

    }

    render() {

        let { username, password, rePassword } = this.state;

        return (
            <form action="/register" method="POST" className={style.registerForm}>

                <label for="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.inputHandler}
                />

                <label for="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.inputHandler}
                />

                <label for="rePassword">Repeat Passoword:</label>
                <input
                    type="password"
                    name="rePassword"
                    placeholder="Repeat Password"
                    value={rePassword}
                    onChange={this.inputHandler}
                />

                <input onClick={this.submitHandler} type="submit" name="Register" value="Register" />
            </form>
        )
    }

}

export default Register;