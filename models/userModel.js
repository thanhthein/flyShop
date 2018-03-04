let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    userModel = new Schema({
        fullname: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        password: {
            type: String,
            default: null
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        phone: {
            type: String,
            default: null
        },
        dayofbirth: {
            type: Date,
            default: null
        },
        address: {
            type: String,
            default: null
        },
        level: {
            type: Number,
            default: 0
        },
        introduce: {
            type: String,
            default: null
        },
        company: {
            type: String,
            default: null
        },
        facebook: {
            type: String,
            default: null
        },
        account_type: {
            type: String,
            default: null
        },
        reset_password_token: {
            type: String,
            default: null
        },
        reset_password_expires: {
            type: Date,
            default: Date.now
        },
        modified_date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            default: null
        },
        access_token: {
            type: String,
            default: null
        }
    })

module.exports = mongoose.model('users', userModel)    