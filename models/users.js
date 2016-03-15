var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Group = require('./group');
var Subject = require('./subject');

var User = new Schema({
	login: {type: String, required: true, lowercase: true, trim: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required:true},
	lastname: {type: String, required: true},
	role: {type: Number, required: true},
	group: {type: Schema.ObjectId, required:false, ref:'Group'},
	subjects: {type: Schema.ObjectId, required:false, ref: 'Subject'}
});

var UserModel = mongoose.model('User', User);

module.exports.User = UserModel;