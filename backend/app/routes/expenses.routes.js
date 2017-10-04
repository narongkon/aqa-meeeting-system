module.exports = function (app) {
    var controller = require('../controllers/expenses.controller')
    app.route('/')
        .get(controller.list)
        .post(controller.insert)
        .put(controller.update)
        .delete(controller.delete);
}