import firebase from '../firebase'

const DB = firebase.firestore();


function getAll() {
    let collection = [];

    return DB.collection("test")
        .orderBy("dateCreated", "desc")
        .get()
        .then((data) => {
            data.forEach((doc) => {
                let id = doc.id;
                let docData = doc.data();

                collection.push({ id, ...docData });

            })

            return collection;

        })
}

const funcs = {
    getAll
}

export default funcs;