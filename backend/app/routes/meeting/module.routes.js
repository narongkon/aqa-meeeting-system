module.exports = function (app) {
    var meeting = require('../../controllers/meeting/module.controller')

    app.get('/getMeeting/:id', meeting.getMeeting)
    app.get('/getProvince', meeting.getProvince)
    app.post('/',meeting.add)
    
}

