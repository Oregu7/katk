//var db = require('../models/db');
var User = require('../models/users').User;

module.exports = function(server){
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket){
		var rooms = [];

		socket.on('addUser', function(data){
			User.findOne({_id: data.id})
			.select('_id group role name lastname')
			.exec(function(err, user){
				console.log(user)
				socket.join(user.group)
				io.in(user.group).emit('user', user)
			})
		})

	})
}
