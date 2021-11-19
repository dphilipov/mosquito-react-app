// Other
import firebase from '../config/firebase';

function getUserData() {
    let user = localStorage.getItem(`user`);

    if (user) {
        return JSON.parse(user);
    }
}

function login(userCredentials) {
    const { username, password } = userCredentials;

    return firebase
        .auth()
        .signInWithEmailAndPassword(username, password)
}

function register(userCredentials) {
    const { username, password } = userCredentials;

    return firebase
        .auth()
        .createUserWithEmailAndPassword(username, password)
}

function saveUserData(data) {
    let { user: { email, uid } } = data;
    localStorage.setItem(`user`, JSON.stringify({ email, uid }));
}

function clearUserData() {
    localStorage.removeItem(`user`);
}

const authServices = {
    getUserData,
    login,
    register,
    saveUserData,
    clearUserData
}

export default authServices;