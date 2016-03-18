var socket = io();
socket
	.on('connect', function(){
		socket.emit('addUser', {id: prompt('Your UserId')})
	})
	.on('user', function(user){
		console.log(user + ' connect chat')
	})
	.on('disconect', function(){
		console.log('disconect')
	})
	.on('newMessage', function(message){
		console.log(message)
	})


$(document).ready(function(){
	$('#send').on('click', function(){
		socket.emit('message', {text: $('#msg').val()})
	})
})
