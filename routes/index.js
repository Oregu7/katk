var express = require('express');
var router = express.Router();
var User = require('../models/users').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(__dirname + '/index.html');
});

router.post('/', function(req, res, next){
	res.send('POST')
})

router.get('/group/:idGroup/users', function(req,res, next){
	User.find({group: req.params.idGroup})
		.select('_id name lastname role')
		.exec(function(err, users){
			if(err){
				res.status(404).send('Not Found')
			}else{
				res.send(users)
			}
		})
})

module.exports = router;
