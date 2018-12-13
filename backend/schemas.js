var mongoose = require('mongoose')

var AccountSchema = mongoose.Schema({
	uid: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	bookmark: {
		type: Array,
		required: false
	}
}, {collection: 'Account'})

var EventSchema = mongoose.Schema({
	eid: {
		type: Number,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	datetime: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	quota: {
		type: String,
		required: true
	}
}, {collection: 'Event'})

var CommentSchema = mongoose.Schema({
	cid: {
		type: Number,
		required: true
	},
	uid: {
		type: Number,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	eid: {
		type: Number,
		required: true
	},
	time: {
		type: Date,
		required: true 
	},
	comment: {
		type: String,
		required: true
	}
}, {collection: 'Comment'})

module.exports = {EventSchema, AccountSchema, CommentSchema}