var express = require('express')
var router = express.Router()
var utils = require('./utils')
var schema = require('./schemas')
var mongoose = require('mongoose')
const Event = mongoose.model('Event', schema.EventSchema)
const Account = mongoose.model('Account', schema.AccountSchema)
const Comment = mongoose.model('Comment', schema.CommentSchema)

router.get('/getAllUser', function(req, res){
	Account.find({}, '-_id')
		.then(function(data, err){
			res.json(data)
		})
})

router.post('/addUser', function(req, res){
	Account.find({}, 'uid -_id').sort({uid : -1}).limit(1)
		.then(function(latestID){
			maxIndex = 0
			if (latestID.length != 0){
				maxIndex = latestID[0].uid + 1
			}
			var instance = new Account({
									uid: maxIndex,
									name: req.body['name'],
									password: req.body['password']
								})
			instance.save().then(function(){
				res.send("done!")
			})
	})
})

router.post('/editUser/:uid', function(req, res){
	var changes = req.body

	Account.findOneAndUpdate({uid: req.params.uid}, {$set: changes}).then(function(data, err){
		if(err) res.send(err)
		res.send("done!")
	})
})

router.post('/addBookMark', function(req, res){
	Account.findOne({uid: req.body['uid']}, '').then(function(data, err){
		if (err) res.send("User not found!")
		data.bookmark.push(req.body['bookmark'])
		data.save()
		res.send("done!")
	})
})

router.get('/getBookMark/:uid', function(req, res){
	Account.findOne({uid: req.params.uid}, 'bookmark -_id').then(function(data, err){
		if (err) res.send("User not found!")
		bookmarks = data['bookmark'].filter(utils.onlyUnique)
		Promise.all(bookmarks.map((eid) =>{
			return new Promise((resolve) => {
				var target = Event.findOne({eid: eid}, '-_id -__v')
				resolve(target.exec())
			})
		})).then((eventData) => {
			returnList = eventData.filter(utils.removeNull)
			res.json(returnList)
		})
	})
})

router.get('/removeUser/:uid', function(req, res){
	var target = req.params.uid
	Account.deleteOne({uid: target})
		.then(function(data1, err1){
			// if (err1) res.send(err1)
			Comment.deleteMany({uid: target}, function(data2, err2){
				// if (err2) res.send(err2)
				res.send("done!")
			})
		})
})

module.exports.router = router