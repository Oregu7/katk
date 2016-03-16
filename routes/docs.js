var express = require('express');
var router = express.Router();
var db = require('../models/db');
var Document = require('../models/docs');
var User = require('../models/users').User;
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var path = require('path');

router.get('/', function(req, res, next){
	res.render('docs', {title: 'Documents'})
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
			var userId = req.body.user;
			User.findOne({_id: userId})
				.exec(function(err, user){
					if(err){
						var err = new Error('Bad UserId');
						err.status = 400;
						next(err);
					}else{
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

			res.send(doc.toJSON())
		}
	});

	console.log(file);
	//res.send({success: 'save'})
})

router.get('/:file', function(req, res, next){
	Document.findOne({_id: req.params.file}, function(err, doc){
		if(err){
			res.send('File is Does Not Exist!')
		}
		console.log(doc)
		//var type = doc.type;
		res.type(doc.type)
		res.sendFile(doc.file)
	})
	
})


module.exports = router;