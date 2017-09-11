module.exports = function(app){
    var meeting = require('../controllers/meeting/meeting_subproject.controller')
    app.get('/project',meeting.list)
    app.get('/project/bygroup/:id',meeting.listbygroup)
    app.get('/project/bylevel/:group/:level',meeting.listbylevel)
    app.get('/project/group',meeting.group)
    app.get('/project/level',meeting.level)
    app.get('/project/:id',meeting.select)
    app.post('/project',meeting.add)
    app.put('/project',meeting.edit)
    app.delete('/project/:id',meeting.del)
}

