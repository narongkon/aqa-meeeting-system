module.exports = function (app) {
    var controller = require('../../controllers/invite/profile.controller')
    app.get('/', controller.list);
}