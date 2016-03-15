var express = require('express');
var router = express.Router();
var db = require('../models/db');
var User = require('../models/users').User;
var passwordHash = require('password-hash');

/* GET users listing. */
router.get('/login/', function(req, res, next) {
	var user = new User({
		login: 'Oregu7',
		password: passwordHash.generate('qwerty123'),
		name: 'Oleg',
		lastname: 'Chicherov'
	});

	user.save();

	res.render('index');
});

router.post('/login/', function(req, res, next){
	if (req.body.login && req.body.password){
		var login = req.body.login.toLowerCase();
		var password = req.body.password;

		User.findOne({login:login}, function(err, doc){
			if(doc && passwordHash.verify(password, doc.password)){
				res.send(doc);
			}else{
				var err = new Error('Bad Login or Password');
				err.status = 400;
				next(err);
			}
			
		})
	}else{
		var err = new Error('Login or Password is undefined')
		err.status = 400;
		next(err);
	}
	
})

module.exports = router;
