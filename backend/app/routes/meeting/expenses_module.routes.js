module.exports = function (app) {
    var meeting = require('../../controllers/meeting/expenses_module.controller')

    app.get('/getData/:id', meeting.getData)
    app.get('/getMeeting/:id', meeting.getMeeting)

}

