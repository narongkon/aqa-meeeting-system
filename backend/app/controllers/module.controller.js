exports.list = function (req, res) {
    const r = req.r;
    var tb = r.table('module')
    if (req.query.hasOwnProperty('id')) {
        tb = tb.get(req.query.id)
    } else {
        tb = tb.getAll(req.query.meeting_id, { index: 'meeting_id' })
    }
    tb.merge(function (m) {
        return {
            date_end_module: m('date_end_module').inTimezone('+07').toISO8601(),
            date_start_module: m('date_start_module').inTimezone('+07').toISO8601()
        }
    })
        .run()
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
        date_start_module: r.ISO8601(req.body.date_start_module + 'T00:00:00+07:00'),
        date_end_module: r.ISO8601(req.body.date_end_module + 'T00:00:00+07:00')
    })

    r.table('module').insert(req.body)
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
        date_start_module: r.ISO8601(req.body.date_start_module + 'T00:00:00+07:00'),
        date_end_module: r.ISO8601(req.body.date_end_module + 'T00:00:00+07:00')
    })
    r.table('module')
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
    r.table('module')
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