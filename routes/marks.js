var express = require('express');
var router = express.Router();
//var db = require('../models/db');
var Mark = require('../models/mark');
var Group = require('../models/group');
var User = require('../models/users').User;

router.get('/:userId', function(req, res, next){
	Mark.find({student: req.params.userId})
		.populate('subject', '-__v -_id')
		.select('-student -__v -_id')
		.exec(function(err, marks){
			if(err){
				console.log(marks)
				res.status(404).send('Marks not found')
			}else{
				res.send(marks)
			}
		})
})

//Получить все группы у которых есть данный предмет
router.get('/subject/:subjectId/groups', function(req, res, next){	
	Group.find({subjects: req.params.subjectId})
		.select('-subjects -__v')
		.populate('specialization', 'name -_id')
		.exec(function(err, groups){
		if(err){
			var err = new Error('Groups or Subject Not Found');
			err.status = 404;
			next(err);
		}else{
			res.send(groups)
		}
	})
})

//Получить все отметки по данному предмету для группы
router.get('/subject/:subjectId/groups/:groupId', function(req, res, next){
	Mark.find({subject: req.params.subjectId})
		.populate({
			path: 'student', 
			select: '_id name lastname group', 
			match: {group: req.params.groupId}})
		.populate('subject')
		.exec(function(err, marks){
			if(err){
				console.log(err)
				res.status(400).send('Bad markId')
			}else{
				response = marks.filter(function(mark){
					if(null != mark.student){
						return mark
					}
				})

				res.send(response)
			}
		})
})


//добавить отметку
router.post('/addMark', function(req, res, next){
	mark = new Mark({
		subject: req.body.subject,
		student: req.body.student,
		mark: req.body.mark
	})

	mark.save(function(err, mark){
		if (err){
			console.log(err)
		}else{
			res.send(mark.toJSON())
		}
	})
})

//удалить отметку
router.delete('/delMark/:markId', function(req,res,next){
	Mark.remove({_id: req.params.markId}, function(err){
		if(err){
			res.status(400).send('Bad markId')
		}else{
			res.status(200).send('success')
		}
	})
})


//изменить отметку
router.put('/editMark', function(req, res, next){
	Mark.update(
	{_id: req.body.id},
	{
		student: req.body.student,
		subject: req.body.subject,
		mark: req.body.mark
	},function(err, model){
		if(err){
			res.status(400).send('Bad markId')
		}else{
			res.status(200).send('success')
		}
	}
	)
})



module.exports = router;