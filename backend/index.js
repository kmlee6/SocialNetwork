var schema = require('./schemas')
var express = require('express')
var request = require("request")
var cheerio = require("cheerio")
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/csci2720-project',{
  useCreateIndex: true,
  useNewUrlParser: true
})

var db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'))

db.once('open', function(){
	console.log("Connected to MongoDB successfully~!")
})

const Event = mongoose.model('Event', schema.EventSchema)
const Account = mongoose.model('Account', schema.AccountSchema)

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

app.get('/getEvent', function(req, res){
	
})

app.get('/refresh', function(req, res){
	request({
		url: "https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json",
		method: "GET"
	}, function(e,r,b){
		var tmp = replaceAll(b,"[^\x00-\x7F]", "")
		tmp = replaceAll(tmp, "[^,\[]{", "")
		tmp = replaceAll(tmp, "}[^,\]]", "")
		var data = JSON.parse(tmp)
		newEvent = []
		for(var key in data){
			// console.log(key)
			// if(key == 4007){
			// 	console.log(data[key])
			// }
			// console.log(data.length)
			var instance = data[key]
			var nextRecord = {}
			nextRecord["name"] = instance["EN_PGM_NAME"]
			nextRecord["type"] = instance["EN_ACT_TYPE_NAME"]
			nextRecord["datetime"] = instance["EN_DAY"]
			nextRecord["location"] = instance["EN_VENUE"]
			nextRecord["quota"] = instance["QUOTA"]
			newEvent.push(nextRecord)
		}
		Event.deleteMany({}, function(){
			Event.insertMany(newEvent).then(function(){
				res.send("down")
			})
		})		
	})
})

app.post('/addUser', function(req, res){
	var instance = new Account({name: req.body['name'], password: req.body['password']})
	instance.save()
})

app.get('/crawlData', function(req, res){
	request({
		url: "https://www.lcsd.gov.hk/datagovhk/event/leisure_prog.json",
		method: "GET"
	}, function(e,r,b){
		var tmp = replaceAll(b,"[^\x00-\x7F]", "")
		tmp = replaceAll(tmp, "[^,\[]{", "")
		tmp = replaceAll(tmp, "}[^,\]]", "")
		var data = JSON.parse(tmp)
		newEvent = []
		for(var key in data){
			var instance = data[key]
			var nextRecord = {}
			nextRecord["name"] = instance["EN_PGM_NAME"]
			nextRecord["type"] = instance["EN_ACT_TYPE_NAME"]
			nextRecord["datetime"] = instance["EN_DAY"]
			nextRecord["location"] = instance["EN_VENUE"]
			nextRecord["quota"] = instance["QUOTA"]
			newEvent.push(nextRecord)
		}
		Event.insertMany(newEvent).then(function(back){
			res.send("haha")
		})
		// res.send(data)
	})
})

var server = app.listen(3000)