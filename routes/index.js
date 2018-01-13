const express = require('express');
const router = express.Router();
const api = require('../api');

router.get('/', function (req, res, next) {
  // Send empty html that uses the js to check if a user is signed in to firebase.
  // If there is a user signed in, a request will be made to /home, otherwise one will be
  // made to /login.
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/entries', function (req, res, next) {

  const params = {
    uid: req.query.uid,
    firstName: req.query.firstname,
    fromDate: req.query.fromdate,
    fromTime: req.query.fromtime,
    toDate: req.query.todate,
    toTime: req.query.totime
  }

  api.read(params, (data) => {
    res.render('home', Object.assign({}, params, data));
  });
});

module.exports = router;