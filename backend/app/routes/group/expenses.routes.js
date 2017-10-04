module.exports = function (app) {
    var controller = require('../../controllers/group/expenses.controller')
    app.get('/', controller.list)
}