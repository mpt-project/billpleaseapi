const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImgurSchema = new Schema({
	'service': { type: String, required: true },
	'access_token': { type: String, required: true },
	'refresh_token': { type: String, required: true },
}, { collection: 'imgur' })

module.exports = mongoose.model('Imgur', ImgurSchema)
