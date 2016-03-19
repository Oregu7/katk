var express = require('express');
var router = express.Router();
var User = require('../models/users').User;
var Group = require('../models/group');
var Subject = require('../models/subject');
var Schedule = require('../models/schedule');

router.get('/:groupId', function(req, res, next){
	Group.findOne({_id: req.params.groupId})
		.select('schedule subjects -_id')
		.populate({
			path: 'schedule', 
			select: '-__v',
			populate: {
				path: 'monday tuesday wednesday thursday friday saturday',
				select: '-__v'
			}
		})
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
	var weekDay = req.body.weekday;
	var scheduleId = req.body.scheduleId;
	var subjects = req.body.subjects;

	console.log(req.body)

	var saveSchedule = function(err, schedule){
		if(err){
			res.status(400).send('Bad Request')
		}else{
			res.status(200).send({msg:'success'})
		}
	}

	switch(weekDay){
		case 'monday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {monday: subjects}},
				saveSchedule
			)
		break;
		case 'tuesday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {tuesday: subjects}},
				saveSchedule
			)
		break;
		case 'wednesday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {wednesday: subjects}},
				saveSchedule
			)
		break;
		case 'thursday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {thursday: subjects}},
				saveSchedule
			)
		break;
		case 'friday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {friday: subjects}},
				saveSchedule
			)
		break;
		case 'saturday':
			Schedule.update(
				{_id: scheduleId},
				{$set: {saturday: subjects}},
				saveSchedule
			)
		break;
	}
	
})

module.exports = router;