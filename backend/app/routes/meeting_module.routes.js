module.exports = function (app) {
    var meeting_module = require('../controllers/meeting/meeting_module.controller')

    app.get('/getMeeting/:id', meeting_module.getMeeting)
    app.get('/getProvince', meeting_module.getProvince)
}

