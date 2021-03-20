import firebase from '../config/firebase'

const DB = firebase.firestore();


function getInitial(limit) {
    let collection = [];

    return DB.collection("test")
        .orderBy("dateCreated", "desc")
        .limit(limit)
        .get()
        .then((data) => {
            if (data.size !== 0) {
                data.forEach((doc) => {
                    let id = doc.id;
                    let docData = doc.data();

                    collection.push({ id, ...docData });

                })

                return {
                    collection,
                    latestDoc: data.docs[data.docs.length - 1]
                }
            } else {
                return undefined;
            }

        })
}

function getMore(limit, latestDoc) {
    let collection = [];

    return DB.collection("test")
        .orderBy("dateCreated", "desc")
        .startAfter(latestDoc)
        .limit(limit)
        .get()
        .then((data) => {
            if (data.size !== 0) {
                data.forEach((doc) => {
                    let id = doc.id;
                    let docData = doc.data();

                    collection.push({ id, ...docData });

                })

                return {
                    collection,
                    latestDoc: data.docs[data.docs.length - 1]
                }
            } else {
                return undefined;
            }

        })
}

function getOne(id) {
    return DB.collection(`test`)
        .doc(id)
        .get()
        .then((data) => {
            let article = { ...data.data(), id: data.id };
            return article;
        })
        .catch((err) => {
            console.log(err);
        })
}

const funcs = {
    getInitial,
    getMore,
    getOne
}

export default funcs;