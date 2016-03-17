var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Document = new Schema({
	title: {type: String, required: true},
	type: {type: String, required: true},
	file: {type: String, required: true}
});

var DocumentModel = mongoose.model('Document', Document);

module.exports = DocumentModel;