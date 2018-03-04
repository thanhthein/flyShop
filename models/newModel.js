// New: Lưu trữ các tin tức, bài đăng trên website

let mongoose = require('mongoose'),
Schema = mongoose.Schema,
newModel = new Schema({
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
    NewImage: {
        type: String,
        default: null
    },
    NewCategoryID: {
        type: Schema.Types.ObjectId,
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
    TopHot: {
        type: String,
        default: null
    },
    ViewCount: {
        type: Number,
        default: 0
    },
    TagID: {
        type: Schema.Types.ObjectId,
        default: null
    }
})

module.exports = mongoose.model('new', newModel)    