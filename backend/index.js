var express = require('express')
var schema = require('./schemas')
var dev = require("./development")
var userInfo = require('./userInfo')
var eventInfo = require('./eventInfo')
var commentInfo = require('./commentInfo')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))
var cors = require('cors')

app.use(cors())

app.use(dev.router)
app.use(userInfo.router)
app.use(eventInfo.router)
app.use(commentInfo.router)

var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/csci2720-project',{
  useCreateIndex: true,
  useNewUrlParser: true
})
mongoose.set('useFindAndModify', false)

var db = mongoose.connection

db.on('error', console.error.bind(console, 'Connection error:'))

db.once('open', function(){
	console.log("Connected to MongoDB successfully~!")
})

var server = app.listen(3000)