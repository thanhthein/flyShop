module.exports = (() => {
    let productRoute = {},
        config = require('../config/apiConfig').CONFIG_API,
        func = require('../libs/Function').function,
        mongoose = require('mongoose'),
        productModel = mongoose.model('product'),
        categoryModel = mongoose.model('category'),
        defaultmess = 'Module product'

    productRoute.product_get = (req, res) => {
        if(func.__check_header_request(req.headers)) {
            if(!req.query.findbyidcategory) {
                productModel.find({}, (err, result) => {
                    if(!func.isEmpty(result)) {
                        res.status(200).json({
                            code: 200,
                            product: result
                        })
                    }else {
                        res.status(404).json({code: 404, message: 'Can\'t query product by category id: ' + req.query.findbyidcategory})
                    }
                })
            }else if(req.query.findbyidcategory) {
                productModel.find({category_id: req.query.findbyidcategory}, (err, result) => {
                    if(result) {
                        res.status(200).json({
                            code: 200,
                            product: result
                        })
                    }else {
                        res.status(404).json({code: 404, message: 'Can\'t query product by category id: ' + req.query.findbyidcategory})
                    }
                }) 
            }else {
                res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
            }
        }else {
            res.status(403).json({code: 403, message: 'The request is understood, but it has been refused or access is not allowed'})
        }
    }        

    /*
    ---------------------------------------------------------------------------------------------------
    - Admin panel: Product
    ---------------------------------------------------------------------------------------------------
    */  

    // GET
    productRoute.admin_product_get = (req, res) => {
        let result_callback_product = (callback) => {
            productModel.find({}, (err, result) => {
                if(result[0] != undefined) {
                    callback(result, true) 
                }else {
                    callback('Product empty, please add new product!', false)
                }
            }).sort({'created_date': -1})
        }

        let task_product_result = (result, mess) => {
            categoryModel.find({}, (err, result_category) => {
                switch(mess) {
                    case true:
                        res.render('admin-panel-product', {
                            layout: 'admin-layout',
                            result_product: result,
                            result_category: result_category,
                            message: defaultmess,
                            title: 'Product'
                        })
                    break
                    case false:
                        res.render('admin-panel-product', {
                            layout: 'admin-layout',
                            message: result,
                            result_category: result_category,
                            title: 'Product'
                        })
                    break
                }
            })
        }

        result_callback_product(task_product_result)
    }

    // POST
    productRoute.admin_product_post = (req, res) => {

        // Add new product
        if(!func.isEmpty(req.body) && !req.body.btnRemove && !req.body.btnEdit && !req.body.idRequest) {
            let add_product_callback = (callback) => {
                let arrImgProduct = new Array()
                if(req.body.productImage_0 != '' )
                    arrImgProduct.push(req.body.productImage_0)
                if(req.body.productImage_1 != '' )  
                    arrImgProduct.push(req.body.productImage_1)
                if(req.body.productImage_2 != '' ) 
                    arrImgProduct.push(req.body.productImage_2)
                new productModel({
                    product_name: req.body.productTitle,
                    description_product: req.body.productDescriptions,
                    image_thumbnail: req.body.productThumbnail,
                    image_product: arrImgProduct,
                    category_id: req.body.productIdCategory,
                    pricing: req.body.productPricing,
                    promotion: req.body.productPromotion,
                    total_product: req.body.productTotalProduct,
                    status: req.body.productStatus
                }).save((err, data) => {
                  if(!err) {
                      callback('Add new product ID: ' + data._id)
                  }else {
                      callback('Add product failed!')
                  }
                })
            }
            let product_task = (status) => {
                let result_callback_product = (callback) => {
                    productModel.find({}, (err, result) => {
                        if(result[0] != undefined) {
                            callback(result, true) 
                        }else {
                            callback('Product empty, please add new product!', false)
                        }
                    }).sort({'created_date': -1})
                }
        
                let task_product_result = (result, mess) => {
                    categoryModel.find({}, (err, result_category) => {
                        switch(mess) {
                            case true:
                                res.render('admin-panel-product', {
                                    layout: 'admin-layout',
                                    result_product: result,
                                    result_category: result_category,
                                    message: status,
                                    title: 'Product'
                                })
                            break
                            case false:
                                res.render('admin-panel-product', {
                                    layout: 'admin-layout',
                                    result_category: result_category,
                                    message: result,
                                    title: 'Product'
                                })
                            break
                        }
                    })
                }
        
                result_callback_product(task_product_result)
            }
            add_product_callback(product_task)
        }

        // Edit product
        if(req.body.btnEdit) {
            message = 'Edit product ID: ' + req.body.btnEdit
            let result_callback_product = (callback) => {
                productModel.find({}, (err, result) => {
                    if(result[0] != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Product empty, please add new product!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_product_result = (result, mess) => {
                let arrCategoryById = new Array(),
                    arrStatus = new Array()

                let task_cat_callback = (callback) => {
                    categoryModel.find({}, (err, result_category) => {
                        callback(result_category)
                    })
                }

                let task_cat = (data) => {
                    productModel.findOne({_id: req.body.btnEdit}, (err, res_prd) => {
                        for(let i = 0; i < data.length; i++) {
                            arrCategoryById.push({
                                option: '<option value="' + data[i]._id + '"' + (res_prd.category_id.equals(data[i]._id) ? 'selected' : '') + '>-- ' + data[i].title + ' --</option>'
                            })
                        }
                        arrStatus.push({
                            option: '<option value="Mới"' + (res_prd.status === 'Mới' ? 'selected' : '') + '>-- Mới (nguyên tem/có mác) --</option>'
                        })

                        arrStatus.push({
                            option: '<option value="Đã qua sử dụng"' + (res_prd.status === 'Đã qua sử dụng' ? 'selected' : '') + '>-- Đã qua sử dụng --</option>'
                        })

                        switch(mess) {
                            case true:
                                res.render('admin-panel-product', {
                                    layout: 'admin-layout',
                                    result_product: result,
                                    formdata: res_prd,
                                    message: message,
                                    title: 'Product',
                                    arrCategoryById: arrCategoryById,
                                    arrStatus: arrStatus
                                })
                            break
                            case false:
                                res.render('admin-panel-product', {
                                    layout: 'admin-layout',
                                    message: result,
                                    title: 'Product',
                                    arrCategoryById: arrCategoryById,
                                    arrStatus: arrStatus
                                })
                            break
                        }
                    })
                }

                task_cat_callback(task_cat)
            }
    
            result_callback_product(task_product_result)
        }

        // Save on edit
        if(req.body.idRequest && req.body.btnSave) {
            message = 'Save product ID: ' + req.body.idRequest
            let result_callback_product = (callback) => {
                productModel.find({}, (err, result) => {
                    if(result[0] != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Product empty, please add new product!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_product_result = (result, mess) => {
                categoryModel.find({}, (err, result_category) => {
                    switch(mess) {
                        case true:
                        let arrImgProduct = new Array()
                        if(req.body.productImage_0 != '' )
                            arrImgProduct.push(req.body.productImage_0)
                        if(req.body.productImage_1 != '' )  
                            arrImgProduct.push(req.body.productImage_1)
                        if(req.body.productImage_2 != '' ) 
                            arrImgProduct.push(req.body.productImage_2)
                        productModel.findByIdAndUpdate({_id: req.body.idRequest}, {
                                product_name: req.body.productTitle,
                                description_product: req.body.productDescriptions,
                                image_thumbnail: req.body.productThumbnail,
                                image_product: arrImgProduct,
                                category_id: req.body.productIdCategory,
                                pricing: req.body.productPricing,
                                promotion: req.body.productPromotion,
                                total_product: req.body.productTotalProduct,
                                status: req.body.productStatus
                            }, {
                                upsert: true,
                                new: true
                            }).exec((err, new_product) => {
                                productModel.find({}, (err, result) => {
                                    if(result) {
                                        res.render('admin-panel-product', {
                                            layout: 'admin-layout',
                                            result_product: result,
                                            result_category: result_category,
                                            message: message,
                                            title: 'Product'
                                        })
                                    }
                                }).sort({'created_date': -1})
                            })
                        break
                        case false:
                            res.render('admin-panel-product', {
                                layout: 'admin-layout',
                                message: result,
                                result_category: result_category,
                                title: 'Product'
                            })
                        break
                    }
                })
            }
    
            result_callback_product(task_product_result)
        }

        // Remove product
        if(req.body.btnRemove) {
            message = 'Remove product ID: ' + req.body.btnRemove
            let result_callback_product = (callback) => {
                productModel.remove({_id: req.body.btnRemove}, (err, result) => {
                    if(result != undefined) {
                        callback(result, true) 
                    }else {
                        callback('Product empty, please add new product!', false)
                    }
                }).sort({'created_date': -1})
            }
    
            let task_product_result = (result, mess) => {
                categoryModel.find({}, (err, result_category) => {
                    switch(mess) {
                        case true:
                            productModel.find({}, (err, result) => {
                                if(!result) {
                                    message = 'Product empty, please add new product!'
                                }
                                res.render('admin-panel-product', {
                                    layout: 'admin-layout',
                                    result_product: result,
                                    result_category: result_category,
                                    message: message,
                                    title: 'Product'
                                })
                            }).sort({'created_date': -1})
                        break
                        case false:
                            res.render('admin-panel-product', {
                                layout: 'admin-layout',
                                message: result,
                                result_category: result_category,
                                title: 'Product'
                            })
                        break
                    }
                })
            }
    
            result_callback_product(task_product_result)
        }
    }

    return productRoute
})()