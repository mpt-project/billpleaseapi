const imageRoutes = require('./image.routes');
const registerRoutes = require('./register');
const loginRoutes = require('./login');
const uploadImage = require('./uploadImage');
const deleteImage = require('./deleteImage');
const receiptRoute = require('./receiptRoute');
const editImage = require('./editImage');
const checkLogin = require('./checkSession');
const logout = require('./logout');

module.exports = (app) => {
    /**
     * Path: /image
     * POST: <upload image> base64 data with compressed image
     */

    app.use('/register', registerRoutes);
    app.use('/login', loginRoutes);
    app.use('/image', checkLogin, imageRoutes);
    app.use('/upload', checkLogin, uploadImage);
    app.use('/delete', checkLogin, deleteImage);
    app.use('/receipts', checkLogin, receiptRoute);
    app.use('/edit', checkLogin, editImage);
    app.use('/logout', checkLogin, logout);
};