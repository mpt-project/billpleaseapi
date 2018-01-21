const ObjectID = require('mongodb').ObjectID;
const { Router } = require('express');
const Image = require('../models/image');

const routes = Router();

routes.post('/', function(req, res){
    if(req.body.name && req.body.descr && req.body.shop && req.body.expire && req.body.imgUrl && req.body.receiptId){
        let imageData = {
            name: req.body.name,
            descr: req.body.descr,
            shop: req.body.shop,
            expire: req.body.expire,
            imgUrl: req.body.imgUrl,
        };
        let receiptId = req.body.receiptId;
        Image.update({_id: ObjectID(receiptId)}, imageData, function(err){
            if(err) res.status(401).json({"message": "Upload receipt error"});
            else res.status(200).json({"message": "Receipt edited successfully"});
        })
    }else{
        res.status(401).json({"message": "All fields are required"});
    }
});

module.exports = routes;