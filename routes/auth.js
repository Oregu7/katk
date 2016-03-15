var express = require('express');
var router = express.Router();
var db = require('../models/db');
var User = require('../models/users').User;
var passwordHash = require('password-hash');
var faker = require('faker')

/* GET users listing. */
router.get('/login/', function(req, res, next) {
	for(i=0; i<=24; i++){
		var user = new User({
			login: faker.internet.email(),
			password: passwordHash.generate('qwerty123'),
			name: faker.name.firstName(),
			lastname: faker.name.lastName(),
			role: 1,
			group: '56e81b49a0f51f680bf3c588'
		});

		user.save();

	}
	

	
	res.render('index');
});

router.post('/login/', function(req, res, next){
	if (req.body.login && req.body.password){
		var login = req.body.login.toLowerCase();
		var password = req.body.password;

		User.findOne({login:login})
			.populate('group')
			.populate('subjects')
			.exec(function(err, user){
			if(user && passwordHash.verify(password, user.password)){
				delete user.password;
				res.send(user);
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
