const { Router } = require('express');
const Image = require('../models/image');
const User = require('../models/user');

const routes = Router();

routes.post('/', function(req, res){
    if(req.body.name && req.body.descr && req.body.shop && req.body.expire && req.body.imgUrl){
        let imageData = {
            name: req.body.name,
            descr: req.body.descr,
            shop: req.body.shop,
            expire: req.body.expire,
            imgUrl: req.body.imgUrl
        };
        Image.create(imageData, function(err, receipt) {
            if(err){
                console.log(err);
                res.status(401).json({"message": "Receipt update error"});
            }else{
                User.update({_id: req.body.id}, {$push: {"receipts": receipt._id}}, function(err){
                    if(err){
                        res.status(401).json({"message": "Receipt update error"});
                    }else{
                        console.log('success');
                        res.status(200).json({"message": "Receipt uploaded successfully"});
                    }
                });
            }
        });
    }else{
        res.status(401).json({"message": "All fields are required"});
    }
});

module.exports = routes;