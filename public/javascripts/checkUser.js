// Check firebase to see if there is a user already signed in
firebase.auth().onAuthStateChanged(user =>
    user ? window.location.href = `/home/${user.uid}` : window.location.href = "/login"
);