const imgurConfig = require('../config/imgur.json')
const rp = require('request-promise')

class ImgurProvider {

	constructor () {
		this.config = imgurConfig
		this.query = {
			uri: '',
			method: 'POST',
			headers: {},
			body: {},
			json: true
		}
	}


	uploadImage (accessToken, image) {
		return new Promise ((resolve, reject) => {
			this.query.uri = this.config.endpoints.upload
			this.query.body = { image: this.prepareString(image) }

			this.setHeader('Authorization', `Bearer ${accessToken}`)

			rp(this.query)
				.then(res => {
					return resolve(res.data)
				})
				.catch(err => {
					return reject(err)
				})
		})
	}

	authorise (refreshToken) {
		return new Promise ((resolve, reject) => {
			this.query.uri = this.config.endpoints.authorization
			const params = this.tokenParams
			params.refresh_token = refreshToken

			this.setHeader('Authorization', `Client-ID ${this.config.clientId}`)

			rp(this.query)
				.then(data => {
					return resolve(data)
				})
				.catch(err => {
					return reject(err)
				})
		})
		
	}

	setHeader (name, value) {
		return this.query.headers[name] = value
	}

	prepareString (base) {
		return base.replace(/^data:image\/[a-z]+;base64,/, "")
	}

	get tokenParams () {
		return {
			refresh_token: '',
			client_id: this.config.clientId,
			client_secret: this.config.clientSecret,
			grant_type: 'refresh_token',
		}
	}
}

module.exports = ImgurProvider
