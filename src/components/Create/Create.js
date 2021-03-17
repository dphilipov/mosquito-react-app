import firebase from '../../firebase.js';
import style from './Create.module.css';

const DB = firebase.firestore();

const Create = () =>  {

    return (
        <form action="/create" method="POST" class={style.createForm}>
            
            <label for="title">Title:</label>
            <input type="text" name="title" placeholder="Title"/>

            <label for="imgUrl">Image Photo:</label>
            <input type="text" name="imgUrl" placeholder="Enter URL here"/>

            <label for="description">Description:</label>
            <textarea type="text" name="description"></textarea>
            
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