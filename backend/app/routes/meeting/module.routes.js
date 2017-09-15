module.exports = function (app) {
    var meeting = require('../../controllers/meeting/module.controller')

    app.get('/getData/:id', meeting.getData)
    app.get('/getMeeting/:id', meeting.getMeeting)
    app.get('/getRegion', meeting.getRegion)
    app.get('/selectData/:id',meeting.select)
    app.post('/',meeting.add)
    app.put('/',meeting.edit)
    app.delete('/:id',meeting.del)
    
}

