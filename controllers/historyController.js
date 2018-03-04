module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        historyModel = mongoose.model('histories'),
        productModel = mongoose.model('product'),
        userModel = mongoose.model('users'),
        historyRoute = {}

    historyRoute.post_bill = (req, res) => {
        let access_token = req.query.access_token
        if(func.__check_header_request(req.headers) && access_token && access_token.trim().length) {
            userModel.findOne({access_token: access_token}, (erruser, resultUser)=> {
                if (resultUser) { 
                    historyModel.find({id_user: req.query.id_user}, (err, result) => {
                        if (result) {
                            res.status(200).json({code: 200, histories: result})
                        } else {
                            res.status(404).json({code: 404, message: 'No history for this user '})
                        }
                    })
                } else {
                    res.status(400).json({code: 400, message: 'Can not find or token account is not authorized!'})
                }
            })
        } else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }

    historyRoute.get_bill = (req, res) => {
        let access_token = req.query.access_token
        if(func.__check_header_request(req.headers) && access_token && access_token.trim().length) {
            userModel.findOne({access_token: access_token}, (erruser, resultUser)=>{
                if (resultUser) {
                    historyModel.findOne({_id : req.query.history_id}, (err, result) => {
                        if (result) {
                            res.status(200).json({code: 200,
                            _id : result._id,
                            time_bought: result.time_bought,
                            total_price: result.total_price,
                            total_product: result.total_product,
                            address: result.address,
                            description: result.description,
                            phone: result.phone,
                            email: result.email,
                            method: result.method,
                            status: result.status,
                            products: result.products,
                            user_name : resultUser.fullname
                         })
                        } else {
                            res.status(404).json({code: 404, message: 'Can\'t query history by history_id: ' + req.query.history_id})
                        }
                    })
                } else {
                    res.status(400).json({code: 400, message: 'Can not find or token account is not authorized!'})
                }
            })
        } else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }     

    historyRoute.add_new_bill = (req, res) => {
        let access_token = req.query.access_token
        if(func.__check_header_request(req.headers) && access_token && access_token.trim().length) {
            userModel.findOne({access_token: access_token}, (err, resultUser) => {
                if(resultUser != null) {
                    new historyModel({
                        id_user: resultUser._id,
                        id_product: req.body.id_product,
                        transaction_name: req.body.transaction_name,
                        products: req.body.products,
                        pricing: req.body.pricing,
                        total_product: req.body.total_product,
                        address: req.body.address,
                        description: req.body.description,
                        phone: req.body.phone,
                        email: req.body.email,
                        method: req.body.method,
                        products: JSON.parse(req.body.products)
                    }).save((err, result) => {
                        res.status(200).json({code: 200, message: 'Add bill success with transaction name: ' + req.body.transaction_name})
                    })
                }else {
                    res.status(400).json({code: 400, message: 'Can not find or token account is not authorized!'})
                }
            })
        }else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }
    
    return historyRoute
})()