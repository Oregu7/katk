var socket = io();
socket
	.on('connect', function(){
		socket.emit('addUser', {id: prompt('Your UserId')})
	})
	.on('user', function(user){
		console.log(user)
		alert(user.name + ' ' + user.lastname + ' connect chat')
	})