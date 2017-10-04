exports.list = function (req, res) {
    const r = req.r;
    r.table('group_expenses')
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

exports.data = function (req, res) {
    console.log(req.query)
    const r = req.r;
    var tb = r.table('group_expenses');

    if (req.query.hasOwnProperty('meeting_id')) {
        tb = tb.merge(
            function (m) {
                var id = m('id');
                var tb = r.table('expenses').getAll([id, req.query.meeting_id],
                    { index: 'groupExpensesIdMeetingId' });
                return {
                    count: tb.count(),
                    sum: tb.sum('expense_sum')
                }
            }
        )
    } else {
        tb = tb.merge(
            function (m) {
                var id = m('id');
                var tb = r.table('expenses').getAll([id, req.query.module_id],
                    { index: 'groupExpensesIdModuleId' });
                return {
                    count: tb.count(),
                    sum: tb.sum('expense_sum')
                }
            }
        )
    }

    tb.orderBy(r.desc('sum'))
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}