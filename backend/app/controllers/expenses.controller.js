exports.list = function (req, res) {
    const r = req.r;
    var tb = r.table('expenses');
    if (req.query.hasOwnProperty('id')) {
        tb = tb.get(req.query.id)
    } else {
        if (req.query.hasOwnProperty('meeting_id')) {
            tb = tb.getAll([Number(req.query.group_id), req.query.meeting_id], { index: 'groupExpensesIdMeetingId' });
        } else if (req.query.hasOwnProperty('module_id')) {
            tb = tb.getAll([Number(req.query.group_id), req.query.module_id], { index: 'groupExpensesIdModuleId' });
        }
    }
    tb.run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

exports.insert = function (req, res) {
    const r = req.r;
    r.table('expenses').insert(req.body)
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
}

exports.update = function (req, res) {
    const r = req.r;
    r.table('expenses')
        .get(req.body.id)
        .update(req.body)
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
}

exports.delete = function (req, res) {
    const r = req.r;
    r.table('expenses')
        .get(req.query.id)
        .delete()
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
}