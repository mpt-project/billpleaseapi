const { Router } = require('express')
const ImgurProvider = require('../providers/imgur.provider')
const ImgurConfig = require('../models/imgur')

const routes = Router()
const img = new ImgurProvider()

routes.post('/', (req, res) => {
	ImgurConfig.findOne({ service: 'imgur.com' }, (err, data) => {
		console.info('Tokens found in database cache')
		const { access_token, refresh_token } = data
		const { image } = req.body

		if (!image) {
			return res.status(400).json({ message: 'Missing "image" parameter' })
		}

		img.uploadImage(access_token, image)
			.then(data => {
				if (data && data.link) {
					res.status(201).json({ url: data.link })
				}
			})
			.catch(err => {
				res.status(500).json({ error: 'Internal Error' })
			})
	})
})

module.exports = routes
