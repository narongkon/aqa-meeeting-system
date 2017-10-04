module.exports = function (app) {
    var controller = require('../../controllers/group/expenses.controller')
    app.get('/', controller.list)
    app.get('/data', controller.data)
}