import firebase from '../../config/firebase.js';
import style from './Login.module.css';

const Login = () =>  {

    return (
        <form action="/login" method="POST" className={style.loginForm}>
            
            <label for="username">Username:</label>
            <input type="text" name="username" placeholder="Username"/>

            <label for="password">Password:</label>
            <input type="password" name="password" placeholder="Password"/>
            
            <input type="submit" name="Login" value="Login"/>
        </form>
    )
}

export default Login;

// DB.collection(`test`)
// .add({
//   title: "test",
//   isOK: true,
// })
// .then((res) => {
//     console.log('Document created with ID:', res.id);
// })
// .catch((err) => {
//     console.log(err);
// })