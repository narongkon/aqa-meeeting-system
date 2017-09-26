module.exports = function (app) {
    var controller = require('../controllers/meeting.controller')
    app.get('/', controller.list);
    app.get('/bygroup',controller.byGroup);
}
