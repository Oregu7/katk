var express = require('express');
var router = express.Router();
var db = require('../models/db');
var Mark = require('../models/mark');
var Lesson = require('../models/lesson');
var Group = require('../models/group');

router.get('/:subjectId', function(req, res, next){
	var response = [];
	Lesson.find({subject: req.params.subjectId}, function(err, lessons){
		if (err){
			res.send(err);
		}

		lessons.forEach(function(key, lesson){
			Group.find({specialization: lesson.specialization, course: lesson.course}, function(err, groups){
				if(err){
					return null
				}

				response = response.concat(groups)
			})
		})
	});

	res.send(response);
})

module.exports = router;