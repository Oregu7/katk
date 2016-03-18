var User = require('../models/users').User;

module.exports = function(server){
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket){
		var rooms = [];

		socket
			.on('addUser', function(data){
				User.findOne({_id: data.id})
				.select('_id group role name lastname')
				.exec(function(err, user){
					if(err || user == null){
						socket.disconnect()
					}else{
						socket.user = user;
						socket.join(socket.user.group);
						io.in(socket.user.group).emit('user', socket.user.name + ' ' + socket.user.lastname)
					}
					
				})
			})
			.on('message', function(message){
				io.in(socket.user.group).emit(
					'newMessage', 
					{
						user: socket.user.name + ' ' + socket.user.lastname,
						message: message.text
					}
				)
			})

	})
}
