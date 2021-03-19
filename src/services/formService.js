import firebase from '../config/firebase';

const DB = firebase.firestore();
const dtFormat = new Intl.DateTimeFormat('bg-BG', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});


export const inputHandler = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
    })
}

export const submitHandler = async (event) => {
    event.preventDefault();
    await this.setState({
        dateCreated: dtFormat.format(new Date()),
    })

    DB.collection(`test`)
        .add(this.state)
        .then((res) => {
            this.props.history.push('/');
        })
        .catch((err) => {
            console.log(err);
        })
}