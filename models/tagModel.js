// Tag: Lưu trử các thẻ

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    tagModel = new Schema({
        TagName: {
            type: String,
            default: null
        }
    })

module.exports = mongoose.model('tag', tagModel)    