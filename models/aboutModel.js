// About: Lưu các bài viết giới thiệu cửa hàng

let mongoose = require('mongoose'),
Schema = mongoose.Schema,
aboutModel = new Schema({
    Title: {
        type: String,
        default: null
    },
    MetaTitle: {
        type: String,
        default: null
    },
    Description: {
        type: String,
        default: null
    },
    Image: {
        type: String,
        default: null
    },
    Detail: {
        type: String,
        default: null
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    ModifiedDate: {
        type: Date,
        default: Date.now
    },
    MetaKeywords: {
        type: String,
        default: null
    },
    MetaDescriptions: {
        type: String,
        default: null
    },
    Status: {
        type: String,
        default: null
    },
})

module.exports = mongoose.model('about', aboutModel)    