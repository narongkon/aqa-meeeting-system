module.exports = function(app){
    var meeting = require('../controllers/meeting/meeting.controller')
    app.get('/project',meeting.list)
    app.get('/project/:id',meeting.select)
    app.post('/project',meeting.add)
    app.put('/project',meeting.edit)
    app.delete('/project/:id',meeting.del)

    app.get('/subgetproject/:id',meeting.subprojectgetproject)
    
}

