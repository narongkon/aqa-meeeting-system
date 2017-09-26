module.exports = function (app) {
    var controller = require('../controllers/meeting.controller')
    app.get('/', controller.list);
}
