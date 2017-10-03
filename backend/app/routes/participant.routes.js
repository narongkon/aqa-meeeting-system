module.exports = function (app) {
    var controller = require('../controllers/participant.controller')
    app.get('/', controller.list);
    app.post('/', controller.add);
}