const User = require('../models/user');

let isLoggedIn = function isLoggedIn(req, res, next) {
    let checkLogin = req.session.userId.filter(function(obj){
        return obj.userId == req.body.id;
    });
    if(checkLogin.length === 0){
        res.status(400).json({"message": "Authorization problem"});
    }else{
        next();
    }
};

module.exports = isLoggedIn;