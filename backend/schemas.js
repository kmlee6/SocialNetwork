var mongoose = require('mongoose')

var EventSchema = mongoose.Schema({
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

var AccountSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
}, {collection: 'Account'})

module.exports = {EventSchema, AccountSchema}