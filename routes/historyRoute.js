module.exports = (app) => {
    let historyController = require('../controllers/historyController'),
        config = require('../config/apiConfig').CONFIG_API

    // Route get, post, put...
    app.route('/' + config.__link_new_bill)
        .post(historyController.add_new_bill)


    // Route get, post, put...
    app.route('/' + config.__link_get_bill)
        .post(historyController.post_bill)
        .get(historyController.get_bill)
}