module.exports = (app) => {
    let adminController = require('../controllers/adminController'),
        config = require('../config/apiConfig').CONFIG_API

    // Admin panel home
    app.route(config.__link_admin)
        .get(adminController.adminhome)
        .post(adminController.adminhome)   
}