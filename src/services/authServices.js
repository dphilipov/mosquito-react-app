
function getUserData() {
    let user = localStorage.getItem(`user`);

    if (user) {
        return JSON.parse(user);
    }
}

function saveUserData(data) {
    let { user: { email, uid } } = data;
    localStorage.setItem(`user`, JSON.stringify({ email, uid }));
}

function clearUserData() {
    localStorage.removeItem(`user`);
}

const funcs = {
    getUserData,
    saveUserData,
    clearUserData
}

export default funcs;