var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb')
var db = mongoose.connection;


module.exports = db;