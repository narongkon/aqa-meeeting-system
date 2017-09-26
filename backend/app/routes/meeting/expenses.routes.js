module.exports = function(app){
    var meeting = require('../../controllers/meeting/expenses.controller')
    app.get('/', meeting.list)
    app.get('/bygroup/:id', meeting.listbygroup)
    app.get('/bylevel/:group/:level', meeting.listbylevel)
    app.get('/group', meeting.group)
    app.get('/level', meeting.level)
}

