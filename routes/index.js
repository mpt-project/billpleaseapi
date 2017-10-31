const { Router } = require('express')

const routes = Router()

routes.all('/', (req, res) => {
	res.status(200).json({ message: 'OK' })
})

module.exports = routes
