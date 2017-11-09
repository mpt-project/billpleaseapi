const express = require('express')
const routes = require('./routes')

const app = express()

/**
 * Set routes for API
 */
routes(app)

app.listen(3000, () => {
	console.info('App listening on port 3000')
})
