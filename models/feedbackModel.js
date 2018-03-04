// Feedback: Lưu trữ thông tin phản hồi của người dùng

let mongoose = require('mongoose'),
Schema = mongoose.Schema,
feedbackModel = new Schema({
    Name: {
        type: String,
        default: null
    },
    Phone: {
        type: String,
        default: null
    },
    Email: {
        type: String,
        default: null
    },
    Address: {
        type: String,
        default: null
    },
    Content: {
        type: String,
        default: null
    },
    Status: {
        type: String,
        default: null
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('feedback', feedbackModel)    