var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut();
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');
//DAta base connection
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/ebonus');
//routing
router.get('/', function(req, res, next) {
console.log(res.locals.user);
console.log(res.locals.logged)
     res.render('index');
});



module.exports = router;


