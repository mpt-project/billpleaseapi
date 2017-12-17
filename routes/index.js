const imageRoutes = require('./image.routes');
const registerRoutes = require('./register');
const loginRoutes = require('./login');
const User = require('../models/user');
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
    app.use('/logout', checkLogin,logout);
};