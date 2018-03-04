module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        slideModel = mongoose.model('slide'),
        categoryModel = mongoose.model('category'),
        adminRoute = {},
        defaultmess = 'Welcome to dashboard FlyShop'
        message = ''

    adminRoute.adminhome = (req, res) => {
        res.render('admin-panel-home', {
            layout: 'admin-layout',
            message: defaultmess,
            title: 'Dashboard'
        })
    }
    
    return adminRoute
})()