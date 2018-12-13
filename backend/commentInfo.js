var express = require('express')
var router = express.Router()
var schema = require('./schemas')
var mongoose = require('mongoose')
const Account = mongoose.model('Account', schema.AccountSchema)
const Comment = mongoose.model('Comment', schema.CommentSchema)

router.post('/saveComment', function(req, res){
	Comment.find({}, 'cid -_id').sort({cid : -1}).limit(1)
		.then(function(latestComment){
			maxIndex = 0
			if (latestComment.length != 0){
				maxIndex = latestComment[0].cid + 1
			}
			var instance = new Comment({
									cid: maxIndex,
									eid: req.body["eid"],
									uid: req.body["uid"],
									username: req.body["username"]
									time: new Date(),
									comment: req.body["comment"]
								})
			instance.save().then(function(){
				res.send("done!")
			})
	})
})

router.get('/getComment/:eid', function(req, res){
	Comment.find({eid: req.params.eid}, '-_id -__v').sort('-time').exec(function(err, data){
		res.json(data)
	})
})

module.exports.router = router