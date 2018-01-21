const { Router } = require('express');
const Image = require('../models/image');
const User = require('../models/user');
const ObjectID = require('mongodb').ObjectID;

const routes = Router();

routes.post('/', function(req, res){
    if(req.body.receiptId){
        let receiptId = req.body.receiptId;
        let userId = req.body.id;
        Image.remove({_id: receiptId}, function(err){
            if(err){
                res.status(401).json({"message": "Receipt delete error"});
            }else{
                User.update({_id: ObjectID(userId)}, {$pull: {"receipts": ObjectID(receiptId)}}, function(err, doc){
                    console.log(doc);
                    if(err) res.status(401).json({"message": "Receipt delete error"});
                    else res.status(200).json({"message": "Receipt deleted successfully"});
                })
            }
        });
    }else{
        res.status(401).json({"message": "Unspecified receipt"});
    }
});

module.exports = routes;