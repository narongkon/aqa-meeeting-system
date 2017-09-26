module.exports = function (app) {
    var meeting = require('../../controllers/meeting/expenses_cost.controller')

    app.get('/getModule/:id', meeting.getModule)
    app.get('/getMeeting/:id', meeting.getMeeting)
    app.get('/getModuleByMeeting/:id', meeting.getModuleByMeeting)
    app.get('/getGroupExpenses', meeting.getGroupExpenses)
    app.get('/getExpenses/:id', meeting.getExpenses)
    app.post('/addExpenses', meeting.addExpenses)
    app.get('/selectExpenses/:id', meeting.selectExpenses)
    app.delete('/delExpenses/:id', meeting.delExpenses)
    app.get('/getData/:id', meeting.getData)
    
}