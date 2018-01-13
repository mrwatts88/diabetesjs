// Initialize firebase and get a reference to the database
const admin = require("firebase-admin");
const serviceAccount = require("./diabetesjs-firebase-adminsdk-7noq6-9cd93b41db.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://diabetesjs.firebaseio.com"
});

const db = admin.database();

function read(params, responseCallback) {
    const fromDateArray = params.fromDate.split('/');
    const toDateArray = params.toDate.split('/');

    const from = (params.fromDate == '') ? '0' :
        fromDateArray[2] + fromDateArray[0] + fromDateArray[1] + params.fromTime.split(':').join('');
    const to = (params.toDate == '') ? '999999999999' :
        toDateArray[2] + toDateArray[0] + toDateArray[1] + params.toTime.split(':').join('');

    let data = { bgl: [], exercise: [], diet: [], medication: [] };
    let ref = db.ref().child(`records/${params.uid}/bgl`);
    ref.orderByChild('dateTime').startAt(from).endAt(to).once('value', bglsnapshot => {
        bglsnapshot.forEach(child => { data.bgl.push(child.val()) })

        ref = db.ref().child(`records/${params.uid}/exercise`);
        ref.orderByChild('dateTime').once('value', exercisesnapshot => {
            exercisesnapshot.forEach(child => { data.exercise.push(child.val()) })

            ref = db.ref().child(`records/${params.uid}/diet`);
            ref.orderByChild('dateTime').once('value', dietsnapshot => {
                dietsnapshot.forEach(child => { data.diet.push(child.val()); })

                ref = db.ref().child(`records/${params.uid}/medication`);
                ref.orderByChild('dateTime').once('value', medicationsnapshot => {
                    medicationsnapshot.forEach(child => { data.medication.push(child.val()); })

                    responseCallback(data);
                });
            });
        });
    });
}

module.exports.read = read;