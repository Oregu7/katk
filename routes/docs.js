var express = require('express');
var router = express.Router();
var db = require('../models/db');
var Document = require('../models/docs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();

var path = require('path');

router.get('/', function(req, res, next){
	res.render('docs', {title: 'Documents'})
})

router.post('/', multipartyMiddleware ,function(req, res, next){
	var file = req.files.file;
	/*var doc = new Document({
		title: req.file.originalname,
		type: req.file.mimetype,
		file: req.file.filename
	});

	doc.save();*/

	console.log(req.files);



	res.send({success: 'save'})
})

router.get('/:file', function(req, res, next){
	Document.findOne({_id: req.params.file}, function(err, doc){
		if(err){
			res.send('File is Does Not Exist!')
		}
		console.log(doc)
		//var type = doc.type;
		res.type(doc.type)
		res.sendFile(path.join(path.join(__dirname,'../uploads/'), doc.file))
	})
	
})


module.exports = router;