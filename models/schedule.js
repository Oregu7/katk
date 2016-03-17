var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = require('./subject');
var Group = require('./group');

var Schedule = new Schema({
	monday: [{type: Schema.ObjectId, ref: 'Subject', required: false}],
	tuesday: [{type:Schema.ObjectId, ref: 'Subject', required: false}],
	wednesday: [{type:Schema.ObjectId, ref: 'Subject', required: false}],
	thursday: [{type:Schema.ObjectId, ref: 'Subject', required: false}],
	friday: [{type:Schema.ObjectId, ref: 'Subject', required: false}],
	saturday: [{type:Schema.ObjectId, ref: 'Subject', required: false}]
});

var ScheduleModel = mongoose.model('Schedule', Schedule);
module.exports = ScheduleModel;