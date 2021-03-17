import firebase from '../../firebase.js';
import style from './Create.module.css';

const DB = firebase.firestore();

const Create = () =>  {

    return (
        <form action="/register" method="POST" class={style.registerForm}>
            
            <label for="username">Username:</label>
            <input type="text" name="username" placeholder="Username"/>

            <label for="password">Password:</label>
            <input type="text" name="password" placeholder="Password"/>

            <label for="rePassword">Repeat Passoword:</label>
            <input type="text" name="rePassword" placeholder="Repeat Password"/>
            
            <input type="submit" name="Create" value="Create"/>
        </form>
    )
}

export default Create;

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