import firebase from '../../firebase.js';
import style from './Register.module.css';

const DB = firebase.firestore();

const Register = () =>  {

    return (
        <form action="/register" method="POST" class={style.registerForm}>
            
            <label for="username">Username:</label>
            <input type="text" name="username" placeholder="Username"/>

            <label for="password">Password:</label>
            <input type="text" name="password" placeholder="Password"/>

            <label for="rePassword">Repeat Passoword:</label>
            <input type="text" name="rePassword" placeholder="Repeat Password"/>
            
            <input type="submit" name="Register" value="Register"/>
        </form>
    )
}

export default Register;

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