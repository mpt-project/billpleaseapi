const { Router } = require('express');

const routes = Router();

routes.post('/', function(req, res){
    req.session.userId = req.session.userId.filter(function(obj){
        return obj.userId != req.body.id
    });
    res.status(200).json({"message": "Successfully logout"});
});

module.exports = routes;