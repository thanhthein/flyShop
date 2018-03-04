module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        slideModel = mongoose.model('slide'),
        slideRoute = {},
        defaultmess = 'Module slide'

    slideRoute.get_slide = (req, res) => {
        if(func.__check_header_request(req.headers)) {
            slideModel.find({}, (err, result) => {
                res.status(200).json({
                    code: 200,
                    banner: result
                })
            })
        }else {
            res.status(403).json({message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }
    

    /*
    ---------------------------------------------------------------------------------------------------
    - Admin panel: Slide
    ---------------------------------------------------------------------------------------------------
    */    
    slideRoute.admin_slide_get = (req, res) => {
        let result_callback_slide = (callback) => {
            slideModel.find({}, (err, result) => {
                if(result[0] != undefined) {
                    callback(result, true) 
                }else {
                    callback('Slide empty, please add new slide!', false)
                }
            }).sort({'created_date': -1})
        }

        let task_slide_result = (result, mess) => {
            switch(mess) {
                case true:
                    res.render('admin-panel-add-slide', {
                        layout: 'admin-layout',
                        result_slide: result,
                        message: defaultmess,
                        title: 'Slide'
                    })
                break
                case false:
                    res.render('admin-panel-add-slide', {
                        layout: 'admin-layout',
                        message: result,
                        title: 'Slide'
                    })
                break
            }
        }

        result_callback_slide(task_slide_result)
    }

    slideRoute.admin_slide_post = (req, res) => {

        // Add new slide
        if(!func.isEmpty(req.body) && !req.body.btnRemove && !req.body.btnEdit && !req.body.idRequest) {
            let add_slide_callback = (callback) => {
                new slideModel({
                    image: req.body.imgUrl,
                    id_product: req.body.idProduct,
                    description: req.body.descriptionProduct
                }).save((err, data) => {
                  if(!err) {
                      callback('Add new slide ID: ' + data._id)
                  }else {
                      callback('Add slide failed!')
                  }
                })
            }
            let slide_task = (status) => {
                let result_callback_slide = (callback) => {
                    slideModel.find({}, (err, result) => {
                        if(result[0] != undefined) {
                            callback(result, true) 
                        }else {
                            callback('Slide empty, please add new slide!', false)
                        }
                    }).sort({'created_date': -1})
                }
        
                let task_slide_result = (result, mess) => {
                    switch(mess) {
                        case true:
                            res.render('admin-panel-add-slide', {
                                layout: 'admin-layout',
                                result_slide: result,
                                message: status,
                                title: 'Slide'
                            })
                        break
                        case false:
                            res.render('admin-panel-add-slide', {
                                layout: 'admin-layout',
                                message: result,
                                title: 'Slide'
                            })
                        break
                    }
                }
        
                result_callback_slide(task_slide_result)
            }
            add_slide_callback(slide_task)
        }

        // Edit slide
        if(req.body.btnEdit) {
            message = 'Edit slide ID: ' + req.body.btnEdit
            let result_callback_slide = (callback) => {
                slideModel.find({}, (err, result) => {
                    if(result[0] != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Slide empty, please add new slide!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_slide_result = (result, mess) => {
                switch(mess) {
                    case true:
                        slideModel.findOne({_id: req.body.btnEdit}, (err, formdata) => {
                            res.render('admin-panel-add-slide', {
                                layout: 'admin-layout',
                                result_slide: result,
                                formdata: formdata,
                                message: message,
                                title: 'Slide'
                            })
                        })
                    break
                    case false:
                        res.render('admin-panel-add-slide', {
                            layout: 'admin-layout',
                            message: result
                        })
                    break
                }
            }
    
            result_callback_slide(task_slide_result)
        }

        // Save on edit
        if(req.body.idRequest && req.body.btnSave) {
            message = 'Save slide ID: ' + req.body.idRequest
            let result_callback_slide = (callback) => {
                slideModel.find({}, (err, result) => {
                    if(result[0] != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Slide empty, please add new slide!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_slide_result = (result, mess) => {
                switch(mess) {
                    case true:
                        slideModel.findByIdAndUpdate({_id: req.body.idRequest}, {
                            image: req.body.imgUrl,
                            id_product: req.body.idProduct,
                            description: req.body.descriptionProduct
                        }, {
                            upsert: true,
                            new: true
                        }).exec((err, new_slide) => {
                            slideModel.find({}, (err, result) => {
                                if(result) {
                                    res.render('admin-panel-add-slide', {
                                        layout: 'admin-layout',
                                        result_slide: result,
                                        message: message,
                                        title: 'Slide'
                                    })
                                }
                            }).sort({'created_date': -1})
                        })
                    break
                    case false:
                        res.render('admin-panel-add-slide', {
                            layout: 'admin-layout',
                            message: result
                        })
                    break
                }
            }
    
            result_callback_slide(task_slide_result)
        }

        // Remove slide
        if(req.body.btnRemove) {
            message = 'Remove slide ID: ' + req.body.btnRemove
            let result_callback_slide = (callback) => {
                slideModel.remove({_id: req.body.btnRemove}, (err, result) => {
                    if(result[0] != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Slide empty, please add new slide!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_slide_result = (result, mess) => {
                switch(mess) {
                    case true:
                        slideModel.find({}, (err, result) => {
                            if(result[0] != undefined) {
                                message = 'Slide empty, please add new slide!'
                            }
                            res.render('admin-panel-add-slide', {
                                layout: 'admin-layout',
                                result_slide: result,
                                message: message,
                                title: 'Slide'
                            })
                        }).sort({'created_date': -1})
                    break
                    case false:
                        res.render('admin-panel-add-slide', {
                            layout: 'admin-layout',
                            message: result,
                            title: 'Slide'
                        })
                    break
                }
            }
    
            result_callback_slide(task_slide_result)
        }
    }
    return slideRoute
})()