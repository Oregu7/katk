var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Specialization = require('./specialization')

var Group = new Schema({
	name: {type: String, required: true, unique: true},
	specialization: {type: Schema.ObjectId, ref: 'Specialization', required: true},
	course: {type: Number, required: true},
	subjects: [{type: Schema.ObjectId, ref: 'Subject', required: false}]
});

var GroupModel = mongoose.model('Group', Group);

module.exports = GroupModel;