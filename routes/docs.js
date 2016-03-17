var express = require('express');
var router = express.Router();
//var db = require('../models/db');
var Document = require('../models/docs');
var User = require('../models/users').User;
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var path = require('path');

router.get('/:userId', function(req, res, next){
	User.findOne({_id: req.params.userId})
		.select('-_id documents')
		.populate('documents', '-__v')
		.exec(function(err, docs){
			if(err){
				res.status(404).send('Not Found')
			}else{
				res.send(docs.documents)
			}
	})
})

router.post('/', multipartyMiddleware ,function(req, res, next){
	var file = req.files.file;
	var doc = new Document({
		title: file.originalFilename,
		type: file.type,
		file: file.path
	});

	doc.save(function(err, doc){
		if(err){
			console.log(err)
		}else{
			var userId = req.body.userId;
			User.findOne({_id: userId})
				.exec(function(err, user){
					if(err){
						var err = new Error('Bad UserId');
						err.status = 400;
						next(err);
					}else{
						console.log(user)
						if(user.role > 2){
							user.documents.push(doc._id)
							user.save()
						}else{
							User.update(
								{group: user.group},
								{$push: {documents: doc._id}},
								{multi: true},
								 function(err, model) {
								    console.log(err);
								    console.log(model)
								 }
							)
						}
					}
			})

			res.send(doc)
		}
	});

	console.log(file);
	//res.send({success: 'save'})
})

router.get('/file/:file', function(req, res, next){
	Document.findOne({_id: req.params.file}, function(err, doc){
		if(err){
			res.send('File is Does Not Exist!')
		}

		console.log(doc)
		res.type(doc.type)
		res.sendFile(doc.file)
	})
	
})


module.exports = router;