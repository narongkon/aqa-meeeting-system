exports.getMeeting = (req, res) => {
  const r = req.r;
  r.table('meeting').get(req.params.id)
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.getData = (req, res) => {
  const r = req.r;
  r.table('module').getAll(req.params.id, { index: 'meeting_id' })
    .merge(function (m) {
      return {
        date_end_module: m('date_end_module').toISO8601(),
        date_start_module: m('date_start_module').toISO8601()
      }
    })
    // .coerceTo('array')
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}
