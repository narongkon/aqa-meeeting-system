module.exports = function (app) {
    var controller = require('../controllers/region.controller')
    app.get('/', controller.list)
}