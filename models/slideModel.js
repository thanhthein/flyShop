// Slide: Lưu trữ các hình ảnh Slide

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    slideModel = new Schema({
        image: {
            type: String,
            default: null
        },
        id_product: {
            type: Schema.Types.ObjectId,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        created_date: {
            type: Date,
            default: Date.now
        }
    })

module.exports = mongoose.model('slide', slideModel)    