const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
const mongo = require('./config/mongo')
const routes = require('./routes')

// set environment
process.env.NODE_ENV = config.env || 'dev';

const app = express()
const db = mongo(config.mongo[process.env.NODE_ENV])
/**
 * Configuration
 */
app.set('port', process.env.port || 3000)

app.use(logger('dev'))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

/** Attach DB to request object */
app.use((req, res, next) => {
	console.log('helo');
	console.log(db);
	req.db = db
	console.log(req.db)		
	return next();
})

/**
 * Set routes for API
 */
routes(app)

app.listen(app.get('port'), () => {
	console.info(`[i] server app is listening on port ${app.get('port')}`)
})
