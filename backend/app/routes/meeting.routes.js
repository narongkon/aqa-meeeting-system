module.exports = function (app) {
    var controller = require('../controllers/meeting.controller')
    // app.get('/', controller.list);
    // app.post('/', controller.insert);
    app.route('/')
        .get(controller.list)
        .post(controller.insert)
        .put(controller.update)
        .delete(controller.delete);
}
