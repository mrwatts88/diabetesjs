const userData = require('../temp_data/temp_data');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  // Send empty html that uses the js to check if a user is signed in to firebase.
  // If there is a user signed in, a request will be made to /home, otherwise one will be
  // made to /login.
  res.render('index');
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.get('/home/:user', function (req, res, next) {
  const userId = req.params.user;
  // Go get users data from firebase and assign to data
  const user = userData; // user should be an empty skeleton, add the user data returned from firebase
  res.render('home', { user: userData, from: '', to: '' });
});

router.post('/entries', function (req, res, next) {
  const params = req.body;
  // Go get entries for the correct time range from firebase, and assign results to user
  res.render('home', { user: userData, fromdate: params.fromdate, fromtime: params.fromtime, todate: params.todate, totime: params.totime });
});

module.exports = router;
