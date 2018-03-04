module.exports = (app) => {
    let productController = require('../controllers/productController'),
        config = require('../config/apiConfig').CONFIG_API

    app.route('/'+config.__link_product)
        .get(productController.product_get)    

    // Admin panel: Product
    app.route(config.__link_admin + '/product')
        .get(productController.admin_product_get)
        .post(productController.admin_product_post)    
}