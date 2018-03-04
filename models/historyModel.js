let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    historyModel = new Schema({
        id_user: {
            type: String,
            default: null
        },
        transaction_name: {
            type: String,
            default: null
        },
        products: [{
            id_product: String,
            product_name: String,
            image_thumbnail:  String,
            pricing: Number,
            total : Number
        }],
        total_price: {
            type: Number,
            default: 0
        },
        time_bought: {
            type: Number,
            default: Date.now
        },
        total_product: {
            type: Number,
            default: 0
        },
        address: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        phone: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        },
        method: {
            type: String,
            default: "Thanh toán khi nhận hàng"
        },
        status: {
            type: String,
            default: "Chưa hoàn tất"
        },
    })

    module.exports = mongoose.model('histories', historyModel)    