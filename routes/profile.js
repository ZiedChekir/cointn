var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut();

/* GET users listing. */
router.get('/',ensureLoggedIn, function(req, res, next) {
  res.render('profile',{
    user: req.user,
    userProfile: JSON.stringify(req.user, null, '  ')
  })
});

module.exports = router;
