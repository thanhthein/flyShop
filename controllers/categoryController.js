module.exports = (() => {
    let func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        categoryModel = mongoose.model('category'),
        categoryRoute = {},
        defaultmess = 'Module category'

    categoryRoute.get_category = (req, res) => {
        if(func.__check_header_request(req.headers)) {
            categoryModel.find({}, (err, result) => {
                res.status(200).json({
                    code: 200,
                    category: result
                })
            })
        }else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }

    /*
    ---------------------------------------------------------------------------------------------------
    - Admin panel: Category
    ---------------------------------------------------------------------------------------------------
    */

    categoryRoute.admin_category_get = (req, res) => {
        let result_callback_category = (callback) => {
            categoryModel.find({}, (err, result) => {
                if(result[0] != undefined) {
                    callback(result, true) 
                }else {
                    callback('Category empty, please add new category!', false)
                }
            }).sort({'created_date': -1})
        }

        let task_category_result = (result, mess) => {
            switch(mess) {
                case true:
                    res.render('admin-panel-category', {
                        layout: 'admin-layout',
                        result_category: result,
                        message: defaultmess,
                        title: 'Category'
                    })
                break
                case false:
                    res.render('admin-panel-category', {
                        layout: 'admin-layout',
                        message: result,
                        title: 'Category'
                    })
                break
            }
        }

        result_callback_category(task_category_result)
    }

    categoryRoute.admin_category_post = (req, res) => {
        // Add new category
        if(!func.isEmpty(req.body) && !req.body.btnRemove && !req.body.btnEdit && !req.body.idRequest) {
            let add_category_callback = (callback) => {
                new categoryModel({
                    title: req.body.cateTitle,
                    seo_title: req.body.cateSeoTitle,
                    image: req.body.cateImage,
                    keywords: req.body.cateKeyword,
                    descriptions: req.body.cateDescriptions
                }).save((err, data) => {
                  if(!err) {
                      callback('Add new category ID: ' + data._id)
                  }else {
                      callback('Add category failed!')
                  }
                })
            }
            let category_task = (status) => {
                let result_callback_category = (callback) => {
                    categoryModel.find({}, (err, result) => {
                        if(result[0] != undefined) {
                            callback(result, true) 
                        }else {
                            callback('Category empty, please add new category!', false)
                        }
                    }).sort({'created_date': -1})
                }
        
                let task_category_result = (result, mess) => {
                    switch(mess) {
                        case true:
                            res.render('admin-panel-category', {
                                layout: 'admin-layout',
                                result_category: result,
                                message: status,
                                title: 'Category'
                            })
                        break
                        case false:
                            res.render('admin-panel-category', {
                                layout: 'admin-layout',
                                message: result,
                                title: 'Category'
                            })
                        break
                    }
                }
        
                result_callback_category(task_category_result)
            }
            add_category_callback(category_task)
        }

        // Edit category
        if(req.body.btnEdit) {
            message = 'Edit category ID: ' + req.body.btnEdit
            let result_callback_category = (callback) => {
                categoryModel.find({}, (err, result) => {
                    if(result[0] != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Category empty, please add new category!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_category_result = (result, mess) => {
                switch(mess) {
                    case true:
                        categoryModel.findOne({_id: req.body.btnEdit}, (err, formdata) => {
                            res.render('admin-panel-category', {
                                layout: 'admin-layout',
                                result_category: result,
                                formdata: formdata,
                                message: message,
                                title: 'Category'
                            })
                        })
                    break
                    case false:
                        res.render('admin-panel-category', {
                            layout: 'admin-layout',
                            message: result,
                            title: 'Category'
                        })
                    break
                }
            }
    
            result_callback_category(task_category_result)
        }

        // Save on edit
        if(req.body.idRequest && req.body.btnSave) {
            message = 'Save category ID: ' + req.body.idRequest
            let result_callback_category = (callback) => {
                categoryModel.find({}, (err, result) => {
                    if(result[0] != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Category empty, please add new category!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_category_result = (result, mess) => {
                switch(mess) {
                    case true:
                        categoryModel.findByIdAndUpdate({_id: req.body.idRequest}, {
                            title: req.body.cateTitle,
                            seo_title: req.body.cateSeoTitle,
                            image: req.body.cateImage,
                            keywords: req.body.cateKeyword,
                            descriptions: req.body.cateDescriptions
                        }, {
                            upsert: true,
                            new: true
                        }).exec((err, new_category) => {
                            categoryModel.find({}, (err, result) => {
                                if(result) {
                                    res.render('admin-panel-category', {
                                        layout: 'admin-layout',
                                        result_category: result,
                                        message: message,
                                        title: 'Category'
                                    })
                                }
                            }).sort({'created_date': -1})
                        })
                    break
                    case false:
                        res.render('admin-panel-category', {
                            layout: 'admin-layout',
                            message: result,
                            title: 'Category'
                        })
                    break
                }
            }
    
            result_callback_category(task_category_result)
        }

        // Remove category
        if(req.body.btnRemove) {
            message = 'Remove category ID: ' + req.body.btnRemove
            let result_callback_category = (callback) => {
                categoryModel.remove({_id: req.body.btnRemove}, (err, result) => {
                    if(result != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Category empty, please add new category!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_category_result = (result, mess) => {
                switch(mess) {
                    case true:
                        categoryModel.find({}, (err, result) => {
                            if(!result) {
                                message = 'Category empty, please add new category!'
                            }
                            res.render('admin-panel-category', {
                                layout: 'admin-layout',
                                result_category: result,
                                message: message,
                                title: 'Category'
                            })
                        }).sort({'created_date': -1})
                    break
                    case false:
                        res.render('admin-panel-category', {
                            layout: 'admin-layout',
                            message: result,
                            title: 'Category'
                        })
                    break
                }
            }
    
            result_callback_category(task_category_result)
        }
    }

    return categoryRoute
})()