exports.list = function (req, res) {
    const r = req.r;
    r.table('module')
        .getAll(req.query.meeting_id, { index: 'meeting_id' })
        .merge(function (m) {
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