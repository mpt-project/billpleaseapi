const mongoose = require('mongoose')

module.exports = url => {
	let db = mongoose.connect(url, { useMongoClient: true })
	console.info(`[i] Successfully connected with MongoDB::${process.env.NODE_ENV}`)
	return db
}
