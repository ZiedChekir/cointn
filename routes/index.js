var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut();
const passport = require('passport');
const env = {
  AUTH0_CLIENT_ID: 'mJj9pgq1Ht9wxl9IV6IoVPudUwY4fe7A',
  AUTH0_DOMAIN: 'zied.eu.auth0.com',
  AUTH0_CALLBACK_URL: 'http://localhost:3000/callback'
};
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/ebonus');


router.get('/', function(req, res, next) {
console.log( res.locals.userinfo);

 console.log(req.user);
    if(req.user){
     res.render('index');
   }else{
    res.render('indexbeforelogging',{layout:false});
  }


});

router.get('/user',ensureLoggedIn, function(req, res, next) {
  res.redirect('/profile');
});

router.get('/login',ensureLoggedOut,passport.authenticate('auth0', {
  clientID: env.AUTH0_CLIENT_ID,
  domain: env.AUTH0_DOMAIN,
  redirectUri: env.AUTH0_CALLBACK_URL,
  audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
  responseType: 'code',
  scope: 'openid profile'
}),
function(req, res) {
  res.redirect('/');
}
);

// Perform session logout and redirect to homepage
router.get('/logout',ensureLoggedIn, (req, res) => {
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',passport.authenticate('auth0', {failureRedirect: '/fail'}),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  }
  );
module.exports = router;
