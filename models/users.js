var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Group = require('./group');
var Subject = require('./subject');
var Document = require('./docs');
var Mark = require('./mark');

var User = new Schema({
	login: {type: String, required: true, lowercase: true, trim: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required:true},
	lastname: {type: String, required: true},
	role: {type: Number, required: true},
	group: {type: Schema.ObjectId, required:false, ref:'Group'},
	subjects: [{type: Schema.ObjectId, required:false, ref: 'Subject'}],
	documents: [{type: Schema.ObjectId, required: false, ref: 'Document'}],
	marks: [{type: Schema.ObjectId, required: false, ref: 'Mark'}]
});

User.methods.toJSON = function(){
	var obj = this.toObject();
	delete obj.password;
	return obj
}

var UserModel = mongoose.model('User', User);

module.exports.User = UserModel;