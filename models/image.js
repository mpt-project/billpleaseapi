const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: {type: String, required: true},
    descr: {type: String, required: true},
    shop: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now},
    expire: {type: Date, required: true},
    imgUrl: {type: String, required: true}
}, {collection: 'images'});

let Image = mongoose.model('Image', imageSchema);
module.exports = Image;