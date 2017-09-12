module.exports = function (app) {
    var meeting_module = require('../controllers/meeting/meeting_module.controller')

    app.get('/getProject/:id', meeting_module.getMeeting)
    app.get('/getRegion', meeting_module.getRegion)

}

