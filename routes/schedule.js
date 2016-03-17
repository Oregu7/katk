var express = require('express');
var router = express.Router();
var User = require('../models/users').User;
var Group = require('../models/group');
var Subject = require('../models/subject');
var Schedule = require('../models/schedule');

router.get('/:groupId', function(req, res, next){
	Group.findOne({_id: req.params.groupId})
		.select('schedule subjects -_id')
		.populate('schedule', '-__v')
		.populate('subjects', '-__v')
		.exec(function(err, data){
			if(err){
				res.status(404).send('Not Found')
			}else{
				res.send(data)
			}
		})
	
})

router.post('/set/', function(req, res, next){
	
})

module.exports = router;