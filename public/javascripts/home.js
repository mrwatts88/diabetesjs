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
    const data = {
        uid,
        entry: entryInput.value,
        date: dateInput.value,
        time: timeInput.value
    }

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('records').child(`${categoryInput.value}`).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/records/' + uid + `/${categoryInput.value}/` + newPostKey] = data;

    firebase.database().ref().update(updates)
        .then(() => historyForm.submit()).catch(err => console.log(err));
}

function logout() {
    firebase.auth().signOut().then(res => window.location.href = '/login');
}

function beforeSubmit() {
    userIdInput.value = firebase.auth().currentUser.uid;
}