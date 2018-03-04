module.exports = (app) => {
    let categoryController = require('../controllers/categoryController'),
        config = require('../config/apiConfig').CONFIG_API

    // Route get, post, put...
    app.route('/' + config.__link_category)
        .get(categoryController.get_category)

    // Category
    app.route(config.__link_admin + '/category')
        .get(categoryController.admin_category_get)
        .post(categoryController.admin_category_post)  
}