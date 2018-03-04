// New tag: Lưu trử các thẻ trong bài viết

let mongoose = require('mongoose'),
Schema = mongoose.Schema,
newtagModel = new Schema({
    NewID: {
        type: Schema.Types.ObjectId,
        default: null
    },
    TagID: {
        type: Schema.Types.ObjectId,
        default: null
    },
})

module.exports = mongoose.model('newtag', newtagModel)    