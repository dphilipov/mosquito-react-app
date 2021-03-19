import firebase from '../firebase'

const DB = firebase.firestore();


function getMore(limit, latestDoc) {
    let collection = [];
    
    return DB.collection("test")
        .orderBy("dateCreated", "asc")
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

const funcs = {
    getMore
}

export default funcs;