exports.list = (req, res) => {
    const r = req.r;
    var tb = r.table('meeting');
    if (req.query.hasOwnProperty('id')) {
        tb = tb.get(req.query.id)
    } else {
        if (req.query.hasOwnProperty('group_work_id')) {
            tb = tb.getAll([req.query.group_meeting_id, req.query.group_work_id], { index: 'groupMeetingAndWork' })
        } else if (req.query.hasOwnProperty('group_meeting_id')) {
            tb = tb.getAll(req.query.group_meeting_id, { index: 'group_meeting_id' })
        }
        tb = tb.eqJoin('group_meeting_id', r.table('group_meeting')).without({ right: 'id' }).zip()
            .merge(function (m) {
                return {
                    level: r.branch(m('group_work_id').eq(null), null, r.db('aqa_expert').table('group_work').get(m('group_work_id')))
                }
            })
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
    req.body = Object.assign(req.body, {
        meeting_year: Number(req.body.meeting_year),
        meeting_hours: Number(req.body.meeting_hours)
    })

    r.table('meeting').insert(req.body)
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
    req.body = Object.assign(req.body, {
        meeting_year: Number(req.body.meeting_year),
        meeting_hours: Number(req.body.meeting_hours)
    })

    r.table('meeting')
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
    r.table('meeting')
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