const ObjectID = require('mongodb').ObjectID;
const { Router } = require('express');
const Image = require('../models/image');
const User = require('../models/user');
const each = require('async/each');
const rp = require('request-promise')

const routes = Router();

routes.post('/', function(req, res){
    let userId = req.body.id;
    User.find({_id: ObjectID(userId)}, function(err, user){
        if(err){
            res.status(401).json({"message": "Error occure why downloading receipts"});
        }else{
            findAllReceipts(user, function(err, receipts){
                if(err) res.status(401).json({"message": "Error occure why downloading receipts"});
                else{
                    downloadImg(receipts, function(err, downloaded){
                       if(err)res.status(401).json({"message": "Error occure why downloading receipts"});
                       else{
                           res.status(200).json(downloaded);
                       }
                    });
                }
            })
        }
    });
});

function findAllReceipts(user, callback){
    let receipts = [];
    each(user[0].receipts, function(receipt, secondcallback){
        Image.find({_id: ObjectID(receipt)}, function(err, data){
            receipts.push(data[0]);
            secondcallback();
        });
    }, function(err){
        if(err) callback(err, null);
        else{
            callback(null, receipts);
        }
    });
}

function downloadImg(receipts, callback){
    let readyReceipts = [];
    each(receipts, function(receipt, secondCallback){
        getBinaryImage(receipt, function(err, data){
            if(err)secondCallback(err);
            else{
                let addImageReceipt = receipt.toObject();
                addImageReceipt.image = data;
                addImageReceipt.receiptId = addImageReceipt._id;
                readyReceipts.push(addImageReceipt);
                secondCallback(null);
            }
        })
    }, function(err){
        if(err)callback(err, null);
        else{
            callback(null, readyReceipts);
        }
    })
}

function getBinaryImage(receipt, callback) {
    rp(receipt.imgUrl)
        .then(res => {
            let data = Buffer.from(res);
            callback(null, data);
        })
        .catch(err => {
            callback(err, null)
        })
}

module.exports = routes;