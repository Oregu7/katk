var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = require('./subject');
var Group = require('./group');

var Schedule = new Schema({
	weekday: {type: Number, min:1, max:7, required: true},
	subject: {type: Schema.ObjectId, ref: 'Subject', required: true},
	number: {type: Number, required: true, default: 1},
	group: {type: Schema.ObjectId, ref: 'Group', required: true}
})

var ScheduleModel = mongoose.model('Schedule2', Schedule)

module.exports = ScheduleModel