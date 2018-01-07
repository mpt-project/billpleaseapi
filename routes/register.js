const { Router } = require('express');
const User = require('../models/user');

const routes = Router();

routes.post('/', function(req, res) {
    console.log(req.body);
    if(req.body.email && req.body.password && req.body.name) {
        let userData = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password
        };
        User.create(userData, function(err, user) {
            if(err) {
                if(err.code === 11000){
                    res.status(401).json({"message": "Email already in use"});
                }else{
                    res.status(401).json({"message": "Registration error"});
                }
            }else {
                if(req.session.userId){
                    req.session.userId.push({userId: user._id});
                    res.status(200).json({"message": "Account successfully created", "id": user._id});
                }else{
                    req.session.userId = [{userId: user._id}];
                    res.status(200).json({"message": "Account successfully created", "id": user._id});
                }

            }
        })
    }else{
        res.status(401).json({"message": "All fields are required"});
    }
});

module.exports = routes;