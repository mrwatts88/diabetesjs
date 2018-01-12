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
    const userId = userIdInput.value;
    const data = {
        category: categoryInput.value,
        entry: entryInput.value,
        date: dateInput.value,
        time: timeInput.value
    }

    mockFirebaseFxn(userId, data).then(res => historyForm.submit()).catch(err => console.log(err))
}

// Replace with firebase fxn
function mockFirebaseFxn(userId, data) {
    return new Promise((res, rej) => {
        console.log(userId, data)
        res();
    })
}

function logout() {
    firebase.auth().signOut().then(res => window.location.href = '/login');
}