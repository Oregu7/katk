var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Subject = new Schema({
	name: {type: String, required: true, lowercase: true, trim:true, unique:true}
});

var SubjectModel = mongoose.model('Subject', Subject);
module.exports = SubjectModel;