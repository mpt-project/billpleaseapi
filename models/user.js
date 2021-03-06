const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//schema for user model
const userSchema = new Schema({
    email: {type: Schema.Types.String, required: true, unique: true},
    password: {type: Schema.Types.String, required: true, unique: false},
    name: {type: Schema.Types.String, required: true, unique: false},
    receipts: {type: Array}
    }, { collection: 'user' });

userSchema.pre('save', function(next){
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

userSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err, null)
            } else if (!user) {
                return callback('there is no user with that email', null);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback('wrong password!', null);
                }
            })
        });
};

let User = mongoose.model('User', userSchema);
module.exports = User;