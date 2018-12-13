var express = require('express')
var request = require("request")
var router = express.Router()
var utils = require("./utils")
var schema = require('./schemas')
var mongoose = require('mongoose')
const Event = mongoose.model('Event', schema.EventSchema)
const Comment = mongoose.model('Comment', schema.CommentSchema)

router.get('/flushData', function(req, res){
	request({
		url: "https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json",
		method: "GET"
	}, function(e,r,b){
		var tmp = replaceAll(b,"[^\x00-\x7F]", "")
		tmp = utils.replaceAll(tmp, "[^,\[]{", "")
		tmp = utils.replaceAll(tmp, "}[^,\]]", "")
		var data = JSON.parse(tmp)
		newEvent = []
		var count = 0
		for(var key in data){
			if(count == 10) break
			count += 1
			var instance = data[key]
			var nextRecord = {}
			nextRecord["eid"] = instance["PGM_CODE"]
			nextRecord["name"] = instance["EN_PGM_NAME"]
			nextRecord["type"] = instance["EN_ACT_TYPE_NAME"]
			nextRecord["date"] = instance["EN_DAY"]
			nextRecord["time"] = instance["PGM_START_TIME"]+" - "+instance["PGM_END_TIME"]
			nextRecord["location"] = instance["EN_VENUE"]
			nextRecord["quota"] = instance["QUOTA"]
			newEvent.push(nextRecord)
		}
		Event.deleteMany({}, function(){
			Event.insertMany(newEvent).then(function(){
				res.send("done")
			})
		})		
	})
})

router.post('/addEvent', function(req, res){
	Event.find({}, 'eid -_id -__v').sort({eid : -1}).limit(1)
		.then(function(latestID){
			maxIndex = 0
			if (latestID.length != 0){
				maxIndex = latestID[0].eid + 1
			}
			var instance = new Event({
									eid: maxIndex,
									name: req.body['name'],
									type: req.body['type'],
									datetime: req.body['datetime'],
									location: req.body['location'],
									quota: req.body['quota']
								})
			instance.save().then(function(){
				res.send("done!")
			})
	})
})

router.get('/getAllEvent', function(req, res){
	console.log("haha")
	Event.find({}, '-_id -__v').then(function(data, err){
		res.json(data)
	})
})

router.get('/getEvent/:key/:value', function(req, res){
	query = {}
	query[req.params.key] = req.params.value
	Event.find(query, '-_id -__v').then(function(data, err){
		if(err) res.send("Error!")
		res.json(data)
	})
})

router.post('/editEvent/:eid', function(req, res){
	var changes = req.body

	Event.findOneAndUpdate({eid: req.params.eid}, {$set: changes}).then(function(data, err){
		if(err) res.send(err)
		res.send("done!")
	})
})

router.get('/removeEvent/:eid', function(req, res){
	var target = req.params.eid
	Event.deleteOne({eid: target})
		.then(function(data1, err1){
			// if (err1) res.send(err1)
			Comment.deleteMany({eid: target}, function(data2, err2){
				// if (err2) res.send(err2)
				res.send("done!")
			})
		})
})



module.exports.router = router