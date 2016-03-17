var express = require('express');
var router = express.Router();
var db = require('../models/db');
var Mark = require('../models/mark');
var Group = require('../models/group');

router.get('/', function(req, res, next){
	res.send('Marks');
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
		.populate('student', '_id name lastname group', {group: req.params.groupId})
		.populate('subject')
		.exec(function(err, marks){
			if(err){
				console.log(err)
				res.status(400).send('Bad markId')
			}else{
				res.send(marks)
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
			res.send(mark._id)
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