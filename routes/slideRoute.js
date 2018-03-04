module.exports = (app) => {
    let slideController = require('../controllers/slideController'),
        config = require('../config/apiConfig').CONFIG_API

    // Route get, post, put...
    app.route('/' + config.__link_slide)
        .get(slideController.get_slide)

    // Add slide
    app.route(config.__link_admin + '/slide')
        .get(slideController.admin_slide_get)
        .post(slideController.admin_slide_post)
}