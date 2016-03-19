var express = require('express');
var router = express.Router();
var User = require('../models/users').User;
var Group = require('../models/group');
var Subject = require('../models/subject');
var Schedule = require('../models/schedule_v2');

router.get('/:groupId', function(req,res,next){
	Schedule.find({group: req.params.groupId})
		.select('-group -__v')
		.populate('subject', '-__v -_id')
		.exec(function(err, schedule_v2){
			if(err){
				console.log(err)
				res.status(404).send('Not Found')
			}else{
				Group.findById(req.params.groupId)
					.select('subjects -_id')
					.populate('subjects')
					.exec(function(err, model){
						if(err){
							console.log(err)
							res.status(404).send('Not Found')
						}else{
							res.send({
								schedule: schedule_v2,
								subjects: model
							})
						}
					})
				
			}
		})
})

router.post('/add/', function(req,res,next){
	var schedule_v2 = new Schedule({
		number: req.body.number,
		group: req.body.group,
		subject: req.body.subject,
		weekday: req.body.weekday
	})

	schedule_v2.save(function(err, model){
		if(err){
			console.log(err)
			res.status(400).send('Bad Request')
		}else{
			res.send(model)
		}
	})
})

router.post('/save/', function(req,res,next){
	var weekday = req.body.weekday,
		group = req.body.group,
		subjects = req.body['subjects[]']

	Schedule.remove({group: group, weekday: weekday}, function(err,removed){
		if(err){
			console.log(err)
			res.status(400).send('Bad Request')
		}else{
			for(i=0; i<subjects.length; i++){
				schedule_item = new Schedule({
					group: group,
					weekday: weekday,
					number: i+1,
					subject:subjects[i]
				})

				schedule_item.save(function(err, model){
					if(err){
						console.log(err)
					}
				})
			}

			res.status(202).send({msg: 'Schedule save'})
		}	
	})

	
})

module.exports = router;