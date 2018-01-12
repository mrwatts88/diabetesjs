const loginErrorMsg = document.querySelector('#login-error-msg');
const signupErrorMsg = document.querySelector('#signup-error-msg');
const forgotErrorMsg = document.querySelector('#forgot-error-msg');
const forgotMsgEmailed = document.querySelector('#forgot-msg-emailed');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const nameInputSignup = document.querySelector('#name-input-signup');
const emailInputSignup = document.querySelector('#email-input-signup');
const passwordInputSignup = document.querySelector('#password-input-signup');
const emailInputForgot = document.querySelector('#email-input-forgot');
const forgotBtn = document.querySelector('#forgot-btn');
const showSignupBtn = document.querySelector('#signup-btn');
const backToLoginBtn = document.querySelector('#signin-btn-signup');
const backToLoginFromForgotBtn = document.querySelector('#signin-btn-forgot');
const loginScreen = document.querySelector('#show-on-login');
const signupScreen = document.querySelector('#show-on-signup');
const forgotScreen = document.querySelector('#show-on-forgot');
const loginBox = document.querySelector('.login-box');

forgotBtn.addEventListener('click', showForgot);
showSignupBtn.addEventListener('click', showSignup);
backToLoginBtn.addEventListener('click', showLogin);
backToLoginFromForgotBtn.addEventListener('click', showLogin);

function login() {
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then(user => window.location.href = `/home/${user.uid}`)
        .catch(err => {
            loginErrorMsg.textContent = err;
            loginErrorMsg.style.visibility = 'visible';
        })
}

function signup() {
    firebase.auth().createUserWithEmailAndPassword(emailInputSignup.value, passwordInputSignup.value)
        .then(user => user.updateProfile({ displayName: nameInputSignup.value }))
        .then(() => window.location.href = `/home/${firebase.auth().currentUser.uid}`)
        .catch(err => {
            signupErrorMsg.textContent = err;
            signupErrorMsg.style.visibility = 'visible';
        })
}

function resetPassword() {
    firebase.auth().sendPasswordResetEmail(emailInputForgot.value)
        .then(() => {
            showLogin();
            forgotMsgEmailed.style.visibility = 'visible';
        }).catch((err) => {
            forgotErrorMsg.textContent = err;
            forgotErrorMsg.style.visibility = 'visible';
        })
}

function showLogin() {
    signupScreen.style.display = 'none';
    forgotScreen.style.display = 'none';
    loginScreen.style.display = 'block';
    loginBox.style.height = '450px';
}

function showSignup() {
    loginScreen.style.display = 'none';
    forgotScreen.style.display = 'none';
    signupScreen.style.display = 'block';
    loginBox.style.height = '530px';
}

function showForgot() {
    loginScreen.style.display = 'none';
    signupScreen.style.display = 'none';
    forgotScreen.style.display = 'block';
    loginBox.style.height = '390px';
}