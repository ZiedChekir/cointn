var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();


router.get('/',ensureLoggedIn,  function(req, res)  {
	res.render('invite')
});


module.exports = router;