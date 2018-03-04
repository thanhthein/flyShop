// Contact: Lưu thông tin liên hệ của cửa hàng

let mongoose = require('mongoose'),
Schema = mongoose.Schema,
contactModel = new Schema({
    Content: {
        type: String,
        default: null
    },
    Status: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model('contact', contactModel)    