var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = require('./subject');
var User = require('./users');

var Mark = new Schema({
	subject: {type: Schema.ObjectId, required: true, ref: 'Subject'},
	student: {type: Schema.ObjectId, required: true, ref: 'User'},
	mark: {type: Number, required: true},
	date: {type: Date, default: Date.now()}
});

var MarkModel = mongoose.model('Mark', Mark);
module.exports = MarkModel;