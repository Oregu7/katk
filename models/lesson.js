var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Subject = require('./subject');
var Specialization = require('./specialization');

var Lesson = new Schema({
	subject: {type: Schema.ObjectId, ref: 'Subject', required: true},
	specialization: {type: Schema.ObjectId, ref: 'Specialization', required: true},
	course: {type: Number, required: true}
});

var LessonModel = mongoose.model('Lesson', Lesson);

module.exports = LessonModel;