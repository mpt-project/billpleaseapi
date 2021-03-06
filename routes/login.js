const { Router } = require('express')
const User = require('../models/user');

const routes = Router();

routes.post('/', function(req, res) {
    if(req.body.email && req.body.password) {
        let userData = {
            email: req.body.email,
            password: req.body.password
        };
        User.authenticate(req.body.email, req.body.password, function(err, user) {
            if(err) {
                res.status(401).json({"message": "Wrong email or password"});
            }else {
                if(req.session.userId){
                    let sessionCheck = req.session.userId.filter(function(obj){
                        return obj.userId == user._id;
                    });
                    if(sessionCheck.length === 0){
                        req.session.userId.push({userId: user._id});
                        res.status(200).json({"message": "Login successfully user", "id": user._id});
                    }else{
                        res.status(200).json({"message": "Session exists ", "id": user._id});
                    }
                } else {
                    req.session.userId = [{userId: user._id}];
                    res.status(200).json({"message": "Login successfully user ", "id": user._id});
                }
            }
        })
    }
});

module.exports = routes;