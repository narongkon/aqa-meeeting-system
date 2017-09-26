module.exports = function (app) {
    var controller = require('../controllers/module.controller')
    app.route('/')
        .get(controller.list)
        .post(controller.insert)
    // .put(controller.update)
    // .delete(controller.delete);
}
