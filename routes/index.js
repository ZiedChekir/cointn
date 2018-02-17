var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut();
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');
const crypto = require('crypto')
//DAta base connection
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/ebonus');
//routing
router.get('/',  function(req, res, next) {

     res.render('index',{home:true});
})

router.get('/checkcoins', async function(req, res,next)  {
  // `new` is a reserved keyword, so we can't use `new` as a variable name.
  // console.log(req.query)
 

  const newCurrency = req.query['new']
  console.log(newCurrency)
  const {
    id,
    uid,
    oid,
    total,
    sig
  } = req.query
   
// Empty Object ...

//so this obviously throws error..
  // const secretHash = crypto.createHash('md5').update('8335728bcaf48908975f99e44b4d2840').digest('hex')
  // if (secretHash !== sig) {
  //   throw new Error('Invalid transaction')
  // }else{
  // 	console.log('success')
  // }
  res.redirect('/')
})
module.exports = router;


