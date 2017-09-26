module.exports = function (app) {
    var controller = require('../../controllers/group/meeting.controller')
    app.get('/', controller.list)
}