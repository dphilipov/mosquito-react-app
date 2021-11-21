import firebase from '../config/firebase'

const DB = firebase.firestore();

function getPlaces(limit, latestDoc = {}) {
    return DB.collection("test")
        .orderBy("timestamp", "desc")
        .startAfter(latestDoc)
        .limit(limit)
        .get()
        .then((fetchedPlaces) => {
            const collection = returnFetchedDataInArray(fetchedPlaces);

            return {
                collection,
                latestDoc: fetchedPlaces.docs[fetchedPlaces.docs.length - 1]
            }

        })
}

function getOne(id) {
    return DB.collection(`test`)
        .doc(id)
        .get()
        .then((fetchedPlace) => {
            const id = fetchedPlace.id;
            const article = { ...fetchedPlace.data(), id };

            return article;
        })
        .catch((err) => {
            console.log(err);
        })
}

function createArticle(placeToCreate) {
    return DB.collection(`test`)
        .add(placeToCreate)
        .then((res) => {
            return res.id;
        })
        .catch((err) => {
            console.log(err);
        })
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

function getProfileVisitedPlaces(userId) {
    return DB.collection("test")
        .where("visited", "array-contains", userId)
        .get()
        .then((profileActivity) => {
            console.log(profileActivity.docs);
            const collection = returnFetchedDataInArray(profileActivity);

            return collection;
        })
        .catch(err => console.log(err))
}

function getProfileComments(userId) {
    let newCollection = [];

    return DB.collection("test")
        .orderBy("dateCreated", "desc")
        .where("commentsUserIds", "array-contains", userId)
        .get()
        .then((data) => {
            const collection = returnFetchedDataInArray(data);

            collection.forEach(item => {
                newCollection.push(...item.comments.filter(x => x.userId === userId));
            })

            return newCollection;

        })
        .catch(err => console.log(err))
}

function checkIfPlaceExists(title) {
    return DB.collection("test")
        .where("title", "==", title)
        .get()
        .then((res) => {
            return !res.empty; // Place exists if res.empty is false and doesn't exists if it's true
        })
        .catch(err => console.log(err))
}

function returnFetchedDataInArray(fetchedData) {
    let collection = [];

    if (fetchedData.size === 0) {
        return {
            collection,
            latestDoc: undefined
        }
    }

    fetchedData.forEach((doc) => {
        const id = doc.id;
        const placeData = doc.data();

        collection.push({ id, ...placeData });
    })

    return collection;
}

const postServices = {
    getPlaces,
    getOne,
    createArticle,
    getProfileVisitedPlaces,
    postComment,
    getProfileComments,
    checkIfPlaceExists,
}

export default postServices;