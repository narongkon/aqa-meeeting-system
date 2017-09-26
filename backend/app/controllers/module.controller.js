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