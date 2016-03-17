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

//add switch weekDay
router.post('/set/', function(req, res, next){
	var weekDay = req.body.weekDay;
	var scheduleId = req.body.scheduleId;
	var subjects = req.body.subjects;

	switch(weekDay){
		case 'monday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {monday: subjects}},
				function(err, schedule){
					res.send('success')
				}
			)
		break;
		case 'tuesday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {tuesday: subjects}},
				function(err, schedule){
					res.send('success')
				}
			)
		break;
		case 'wednesday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {monday: subjects}},
				function(err, schedule){
					res.send('success')
				}
			)
		break;
		case 'thursday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {thursday: subjects}},
				function(err, schedule){
					res.send('success')
				}
			)
		break;
		case 'friday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {friday: subjects}},
				function(err, schedule){
					res.send('success')
				}
			)
		break;
		case 'saturday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {saturday: subjects}},
				function(err, schedule){
					res.send('success')
				}
			)
		break;
	}
	
})

module.exports = router;