module.exports = function (app) {
    var controller = require('../../controllers/group/work.controller')
    app.get('/', controller.list)
}