var express = require('express');
var router = express.Router();
var User = require('../models/users').User;
var Group = require('../models/group');

router.get('/', function(req,res){
  res.render('chat')
})

module.exports = router;