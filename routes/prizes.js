var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var games = require('../models/games');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const ensureLoggedOut = require('connect-ensure-login').ensureLoggedOut();
var User = require('../models/users');
var coinsModel = require('../functionManagement/coins');
var coinsInstance = new coinsModel();


var gameInfo

mongoose.Promise = global.Promise;
mongoose.createConnection('localhost:27017/ebonus');


router.get('/',ensureLoggedIn,  function(req, res)  {
	games.find(function(err,aviableGames){		
		res.render('prizes/games',{games:aviableGames,prizes:true});
	})
	
});
router.get('/:game',ensureLoggedIn,  function(req, res)  {
	var game = req.params.game;	

	games.findOne({title:game},function(err,doc){
		function ableToBuy(){
			return res.locals.usercoins >= doc.price ? true : false;
		}
		gameInfo = doc;
		
		res.render('prizes/gameinfo',{game:doc,ableToBuy:true});
	})	
});

router.get('/:game/redeem',ensureLoggedIn,function(req,res){
	var game = req.params.game;
	games.findOne({title:game},function(err,game){
		if(err) 
			return handleError(err)
		if(game){
			res.render('prizes/redeem',{game:game})
		}else{
			res.redirect('/prizes')
		}
		
		
	})
		
})
router.get('/:game/redeem/confirm',ensureLoggedIn,function(req,res){
	if(gameInfo){
		User.findOne({'_id':res.locals.user._id}, function (err, user) {
			if (err) return handleError(err);
			if(Number(coinsInstance.decryptcoins(user.coins)) >=gameInfo.price){
				console.log(user)
				//under this line the encrypted value of coins gets decrypted ,  added some number, encrypted it again and stored it in a variable
				user.coins = coinsInstance.encryptcoins((Number(coinsInstance.decryptcoins(user.coins)) - gameInfo.price).toString());
				user.orders.push({
					game:gameInfo,
					status:"pending"
				}) 
				user.save(function (err) { // user coins saved to database
					if (err) handleError(err)								
						res.redirect('/profile')
				});
			}
		});
	}
	else{
		res.redirect('/prizes');
	}	
})



module.exports = router;

