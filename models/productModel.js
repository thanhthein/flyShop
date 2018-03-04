// Product: Lưu trữ thông tin sản phẩm

let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    productModel = new Schema({
        product_name: {
            type: String,
            default: null
        },
        description_product: {
            type: String,
            default: null
        },
        image_thumbnail: {
            type: String,
            default: null
        },
        image_product: {
            type: JSON,
            default: [
                {
                    image: ''
                },
                {
                    image: ''
                },
                {
                    image: ''
                }
            ]
        },
        category_id: {
            type: Schema.Types.ObjectId,
            default: null
        },
        pricing: {
            type: Number,
            default: 0
        },
        promotion: {
            type: Number,
            default: 0
        },
        total_product: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: null
        },
        created_date: {
            type: Date,
            default: Date.now
        },
        modified_date: {
            type: Date,
            default: Date.now   
        },
        buy_count: {
            type: Number,
            default: 0
        }
    })

module.exports = mongoose.model('product', productModel)    