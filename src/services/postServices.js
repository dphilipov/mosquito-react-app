import firebase from '../firebase'

const DB = firebase.firestore();


function getAll() {
    let collection = [];

    return DB.collection("test")
        .get()
        .then((data) => {
            data.forEach((doc) => {
                let id = doc.id;
                let description = doc.data().description;

                collection.push({ id, description });

            })

            return collection;

        })
}

export default {
    getAll
}