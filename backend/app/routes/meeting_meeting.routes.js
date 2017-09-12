module.exports = function(app){
    var meeting = require('../controllers/meeting/meeting_meeting.controller')
    app.get('',meeting.list)
    app.get('/bygroup/:id',meeting.listbygroup)
    app.get('/bylevel/:group/:level',meeting.listbylevel)
    app.get('/group',meeting.group)
    app.get('/level',meeting.level)
    app.get('/:id',meeting.select)
    app.post('',meeting.add)
    app.put('',meeting.edit)
    app.delete('/:id',meeting.del)
}

