module.exports = function (app) {
    var controller = require('../controllers/module.controller')
    app.get('/getarray', controller.getarray)
    app.route('/')
        .get(controller.list)
        .post(controller.insert)
        .put(controller.update)
        .delete(controller.delete);
}
