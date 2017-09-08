module.exports = function(app){
    var meeting = require('../controllers/meeting/meeting_expenses.controller')
    app.get('/',meeting.list)
    app.get('/:id',meeting.select)
    app.post('/',meeting.add)
    app.put('/',meeting.edit)
    app.delete('/:id',meeting.del)
    
}

