const { Router } = require('express');
const ImgurProvider = require('../providers/imgur.provider');
const ImgurConfig = require('../models/imgur');

const routes = Router();
const img = new ImgurProvider();

routes.post('/', (req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).json({ message: 'Missing "image" parameter' })
    }
	ImgurConfig.findOne({ service: 'imgur.com' }, (err, data) => {
		const { access_token, refresh_token } = data
		const today = new Date(Date.now());
		const expire = new Date(data.expires);
		if(today < expire){
            img.uploadImage(access_token, image)
            	.then(data => {
            		if (data && data.link) {
            			res.status(201).json({ url: data.link })
            		}
            	})
            	.catch(err => {
            		res.status(500).json({ error: 'Internal Error' })
            	})
		}else {
            img.getTokenParams(refresh_token, (err, newToken) => {
                if(err){
                    res.status(500).json({ error: 'Internal Error' })
                }else{
                    data.refresh_token = newToken.refresh_token;
                    data.access_token = newToken.access_token;
                    data.expires = new Date(newToken.expires_in + Date.now());
                    data.save((err) => {
                        if(err){
                            res.status(500).json({ error: 'Internal Error' })
                        }else{
                            img.uploadImage(access_token, image)
                            	.then(data => {
                            		if (data && data.link) {
                            			res.status(201).json({ url: data.link })
                            		}
                            	})
                            	.catch(err => {
                            		res.status(500).json({ error: 'Internal Error' })
                            	})
                        }
                    })
                }
            });
		}

	})
});

module.exports = routes;
