var mongoose = require('mongoose');
mongoose.connect('mongodb://oregu:qwerty123@ds013619.mlab.com:13619/main')
var db = mongoose.connection;


module.exports = db;