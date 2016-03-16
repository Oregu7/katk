var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = require('./subject');
var Group = require('./group');

var Schedule = new Schema({
	weekDay: {type: Number, required: true},
	number: {type: Number, required: true},
	subject: {type: Schema.ObjectId, required: true, ref: 'Subject'},
	group: {type: Schema.ObjectId, required: true, ref: 'Group'}
});

var ScheduleModel = mongoose.model('Schedule', Schedule);
module.exports = ScheduleModel;