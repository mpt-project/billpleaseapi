const mongoose = require('mongoose')

module.exports = url => {
	let db = mongoose.connect(url, { useMongoClient: true })

	mongoose.connection.once('open', () => {
		console.info(`[i] Successfully connected with MongoDB::${process.env.NODE_ENV}`)
		return db
	})

	mongoose.connection.on('error', err => {
		console.error(`[x] ERROR with MongoDB connection::${err}`)
		console.info('Need to restart server...')
	})
}
