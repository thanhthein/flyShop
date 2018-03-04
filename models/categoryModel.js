let mongoose = require('mongoose'),
Schema = mongoose.Schema,
categoryModel = new Schema({
    title: {
        type: String,
        default: null
    },
    seo_title: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    create_date: {
        type: Date,
        default: Date.now
    },
    modified_date: {
        type: Date,
        default: Date.now
    },
    keywords: {
        type: String,
        default: null
    },
    descriptions: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('category', categoryModel)    