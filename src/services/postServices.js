import firebase from '../config/firebase'

const DB = firebase.firestore();


function getInitial(limit) {
    let collection = [];

    return DB.collection("test")
        .orderBy("timestamp", "desc")
        .limit(limit)
        .get()
        .then((data) => {
            if (data.size > 0) {
                data.forEach((doc) => {
                    const id = doc.id;
                    const docData = doc.data();

                    collection.push({ id, ...docData });

                })

                return {
                    collection,
                    latestDoc: data.docs[data.docs.length - 1]
                }
            } else {
                return {
                    collection,
                    latestDoc: undefined
                }
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
                    const id = doc.id;
                    const docData = doc.data();

                    collection.push({ id, ...docData });

                })

                return {
                    collection,
                    latestDoc: data.docs[data.docs.length - 1]
                }
            } else {
                return {
                    collection,
                    latestDoc: undefined
                }
            }

        })
}

function getOne(id) {
    return DB.collection(`test`)
        .doc(id)
        .get()
        .then((data) => {
            const id = data.id;
            const article = { ...data.data(), id };

            return article;
        })
        .catch((err) => {
            console.log(err);
        })
}

function getProfileActivity(id) {
    let collection = [];

    return DB.collection("test")
        .where("visited", "array-contains", id)
        .get()
        .then((data) => {
            if (data.size !== 0) {
                data.forEach((doc) => {
                    const id = doc.id;
                    const docData = doc.data();

                    collection.push({ id, ...docData });

                })

                return collection;
            } else {
                return [];
            }

        })
        .catch(err => console.log(err))
}

function postComment(article) {
    let { id } = article;

    DB.collection(`test`)
        .doc(id)
        .set({
            ...article,
            comments: article.comments
        })
        .then((res) => {
            console.log('success');
        })
        .catch((err) => {
            console.log(err);
        })
}

function getProfileComments(userId) {
    let collection = [];
    let newCollection = [];

    return DB.collection("test")
        .orderBy("dateCreated", "desc")
        .where("commentsUserIds", "array-contains", userId)
        .get()
        .then((data) => {
            if (data.size !== 0) {
                data.forEach((doc) => {

                    const id = doc.id;
                    const docData = doc.data();

                    collection.push({ id, ...docData });

                })

                collection.forEach(item => {
                    newCollection.push(...item.comments.filter(x => x.userId === userId));
                })

                return newCollection;
            } else {
                return [];
            }

        })
        .catch(err => console.log(err))
}

function checkIfTitleExists(title) {
    let exists = false;

    return DB.collection("test")
        .where("title", "==", title)
        .get()
        .then((res) => {
            res.forEach((doc) => {
                exists = true;
            })

            return exists;
        })
        .catch(err => console.log(err))

}

const funcs = {
    getInitial,
    getMore,
    getOne,
    getProfileActivity,
    postComment,
    getProfileComments,
    checkIfTitleExists,
}

export default funcs;