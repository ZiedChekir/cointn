var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var games = require('../models/games');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut();



mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/ebonus');

router.get('/',ensureLoggedIn,  function(req, res)  {
	games.find(function(err,aviableGames){
		
		res.render('prizes/games',{games:aviableGames});
	})
	
});
router.get('/:game',ensureLoggedIn,  function(req, res)  {
	var game = req.params.game;
	
	games.find({title:game},function(err,doc){
		console.log(doc[0].title);
		
		res.render('prizes/gameinfo',{game:doc[0]});
	})
	
	
});



module.exports = router;

//PRIZES PAGE is DISABLED FOR NOW
// router.get('/',ensureLoggedIn,  function(req, res)  {
// 	res.render('prizes/prizes')
// });