var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Specialization = new Schema({
	name: {type: String, required: true, lowercase: true, unique: true},
	index: {type: Number, required: true, unique: true}
});

var SpecializationModel = mongoose.model('Specialization', Specialization);

module.exports = SpecializationModel;