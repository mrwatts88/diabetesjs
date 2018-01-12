// Check firebase to see if there is a user already signed in
firebase.auth().onAuthStateChanged(user =>
    user ? window.location.href = `/entries?uid=${user.uid}&firstname=${user.displayName}&fromdate=${''}&fromtime=${''}&todate=${''}&totime=${''}` : window.location.href = "/login"
);