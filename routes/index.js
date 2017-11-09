const imageRoutes = require('./image.routes')

module.exports = (app) => {
    /**
     * Path: /image
     * POST: <upload image> base64 data with compressed image
     */
    app.use('/image', imageRoutes)
}
