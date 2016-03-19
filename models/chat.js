var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Group = require('./group');

var Message = new Schema({
	user: {type: String, required: true},
	message: {type: String, required: true},
	date: {type: Date, default: Date.now()}
})

var Chat = new Schema({
	group: {type: Schema.ObjectId, required: true, ref: 'Group'}
	messages: [Message, required: false]
})

var ChatModel = mongoose.model('Chat', Chat)

module.exports = ChatModel