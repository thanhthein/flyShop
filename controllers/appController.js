module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        appModel = mongoose.model('appModel'),
        appRoute = {}

    appRoute.home = (req, res) => {
        res.json({code: 200, message: 'Hello world!'})
    }
    
    return appRoute
})()