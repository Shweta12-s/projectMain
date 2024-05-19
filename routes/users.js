const express = require ('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../views/models/user');
const users = require('../controllers/users');

router.route('/register')
.get(users.renderRegister )
.post( catchAsync(users.register))



router.route('/login')
.get(users.renderLogin)

.post( passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login)

router.get('/logout',users.logout);

// app.get('/logout', (req, res) => {
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/');
//     });
//   });

module.exports= router;
// app.post('/logout', function(req, res, next) {
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
//   });