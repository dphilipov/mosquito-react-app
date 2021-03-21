import firebase from '../../config/firebase.js';
import {Component} from 'react';
import style from './Login.module.css';

const auth = firebase.auth();

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    inputHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    submitHandler = (event) => {
        event.preventDefault();

        let { username, password } = this.state;

        auth.signInWithEmailAndPassword(username, password)
            .then((userCredentials) => {
                console.log(userCredentials);
                // this.props.history.push('/login');


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
            <form action="/login" method="POST" className={style.loginForm}>
                
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
                
                <input onClick={this.submitHandler} type="submit" name="Login" value="Login"/>
            </form>
        )
    }

}

export default Login;