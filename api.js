// Initialize firebase and get a reference to the database
const admin = require("firebase-admin");
const serviceAccount = require("./diabetesjs-firebase-adminsdk-7noq6-9cd93b41db.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://diabetesjs.firebaseio.com"
});

const db = admin.database();

function read(uid, responseCallback) {
    let data = { bgl: [], exercise: [], diet: [], medication: [] };
    let ref = db.ref().child(`records/${uid}/bgl`).orderByChild('time');
    ref.once('value', bglsnapshot => {
        bglsnapshot.forEach(child => { data.bgl.push(child.val()) })

        ref = db.ref().child(`records/${uid}/exercise`);
        ref.once('value', exercisesnapshot => {
            exercisesnapshot.forEach(child => { data.exercise.push(child.val()) })

            ref = db.ref().child(`records/${uid}/diet`);
            ref.once('value', dietsnapshot => {
                dietsnapshot.forEach(child => { data.diet.push(child.val()); })

                ref = db.ref().child(`records/${uid}/medication`);
                ref.once('value', medicationsnapshot => {
                    medicationsnapshot.forEach(child => { data.medication.push(child.val()); })

                    responseCallback(data);
                });
            });
        });
    });
}

module.exports.read = read;