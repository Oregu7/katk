var express = require('express');
var router = express.Router();
//var db = require('../models/db');
var Mark = require('../models/mark');
var Group = require('../models/group');
var User = require('../models/users').User;



//изменить отметку
router.post('/editMark', function(req, res, next){
	Mark.update(
		{_id: req.body.markId},
		{
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

//добавить отметку
router.post('/addMark', function(req, res, next){
	mark = new Mark({
		subject: req.body.subjectId,
		mark: req.body.mark
	})
	mark.save(function(err, mark){
		if (err){
			console.log(err)
		}else{
			User.update(
				{_id: req.body.userId},
				{$push: {marks: mark._id}},
				function(err, mark){
					if(err){
						res.status(400).send('Bad Request')
					}else{
						res.send({id: mark._id})
					}
				}
			)
		}
	})
})

router.get('/:userId', function(req, res, next){
	User.findOne({_id: req.params.userId})
		.select('group marks -_id')
		.populate({
			path: 'marks',
			populate: {
				path:'subject',
				select: 'name'
			}
		})
		.populate({
			path: 'group',
			populate: {
				path: 'subjects'
			}
		})
		.exec(function(err, data){
			new Promise(function(resolve, reject){
				var findById = function (source, id) {
				  for (var i = 0; i < source.length; i++) {
				    if (String(source[i]._id) === String(id)) {
				      return i;
				    }
				  }
				}
				var subjects = [];
				for(i=0;i<data.group.subjects.length;i++){
					subjects.push({
						name: data.group.subjects[i].name,
						_id: data.group.subjects[i]._id,
						marks: []
					})
				}

				for(i=0;i<data.marks.length;i++){
					var subjectIndex = findById(subjects, data.marks[i].subject._id);
					subjects[subjectIndex].marks.push({
						mark: data.marks[i].mark,
						date: data.marks[i].date
					})
				}
				
				
				resolve(subjects)
			}).then(function(data_s){
				res.send(data_s)		
			})
			
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
	User.find({group: req.params.groupId})
		.select('marks name lastname')
		.populate({
			path: 'marks',
			select: '-subject -__v',
			match: {subject: req.params.subjectId}
		})
		.exec(function(err, data){
			res.send(data)
		})
})

//удалить отметку
router.get('/delMark/:markId', function(req,res,next){
	Mark.remove({_id: req.params.markId}, function(err){
		if(err){
			res.status(400).send('Bad markId')
		}else{
			res.status(200).send('success')
		}
	})
})

router.get('/update/all', function(req,res,next){

	mark = new Mark({
		subject: '56e855f7ccb07e1b19d17b26',
		mark: 0
	})

	mark.save(function(err, doc){
		User.update(
			{},
			{$push: {marks: doc._id}},
			{multi: true},
			function(err, mark){
				console.log(err)
				res.send(mark)
			}
		)
	})
	
})



module.exports = router;