let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    appModel = new Schema({
        DATA_1: {
            type: String,
            default: null
        },
        DATA_2: {
            type: Number,
            default: 0
        },
        DATA_3: {
            type: Date,
            default: Date.now
        },
        DATA_4: {
            type: [{
                type: String,
                enum: ['STATUS_0', 'STATUS_1', 'STATUS_2']
            }],
            default: ['STATUS_0']
        }
    })

module.exports = mongoose.model('appModel', appModel)    