var express = require('express');
var router = express.Router();
//var db = require('../models/db');
var User = require('../models/users').User;
var Subject = require('../models/subject');
var passwordHash = require('password-hash');
//var faker = require('faker')

/* GET users listing. */
router.get('/login/', function(req, res, next) {
		/*var user = new User({
			login: faker.internet.email(),
			password: passwordHash.generate('qwerty123'),
			name: faker.name.firstName(),
			lastname: faker.name.lastName(),
			role: 3,
			subjects: ["56e855f7ccb07e1b19d17b26", "56e855f7ccb07e1b19d17b27"]
		});

		user.save();*/

		res.send('Login')

});

router.post('/login/', function(req, res, next){
	if (req.body.login && req.body.password){
		var login = req.body.login.toLowerCase();
		var password = req.body.password;

		User.findOne({login:login})
			.populate({path : 'group', populate : {path : 'specialization'}, select: '-subjects'})
			.populate('subjects')
			.select('-documents -marks')
			.exec(function(err, user){
			if(user && passwordHash.verify(password, user.password)){
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
