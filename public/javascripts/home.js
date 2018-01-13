const addEntryBtn = document.querySelector('#add-entry-btn');
const categoryInput = document.querySelector('#category-input');
const entryInput = document.querySelector('#entry-input');
const dateInput = document.querySelector('#date-input');
const timeInput = document.querySelector('#time-input');
const userIdInput = document.querySelector('#user-id-input');
const historyForm = document.querySelector('#history-form');
const logoutBtn = document.querySelector('.logout-btn');

addEntryBtn.addEventListener('click', addEntryToFirebase);
logoutBtn.addEventListener('click', logout);

function addEntryToFirebase() {
    const uid = firebase.auth().currentUser.uid;
    userIdInput.value = uid;
    const dateArray = dateInput.value.split('/');
    const year = dateArray[2];
    const month = dateArray[0];
    const day = dateArray[1];

    const dateTime = year + month + day + timeInput.value.split(':').join('');
    const data = {
        uid,
        dateTime,
        entry: entryInput.value
    }

    firebase.database().ref().child('records').child(uid).child(`${categoryInput.value}`).push(data)
        .then(() => historyForm.submit()).catch(err => console.log(err));
}

function logout() {
    firebase.auth().signOut().then(res => window.location.href = '/login');
}

function beforeSubmit() {
    userIdInput.value = firebase.auth().currentUser.uid;
}