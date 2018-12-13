var express = require('express')
var router = express.Router()
var schema = require('./schemas')
var mongoose = require('mongoose')
const Event = mongoose.model('Event', schema.EventSchema)
const Account = mongoose.model('Account', schema.AccountSchema)

router.get('/postman', function(req, res){
	res.sendFile(__dirname + '/form.html')
})

router.get('/clearEvent', function(req, res){
	Event.deleteMany({}, function(){
		res.send("Done!")
	})
})
router.get('/clearAccount', function(req, res){
	Account.deleteMany({}, function(){
		res.send("Done!")
	})
})

module.exports.router = router