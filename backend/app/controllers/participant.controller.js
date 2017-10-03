exports.list = (req, res) => {
  const r = req.r;
  r.db('aqa_meeting').table('module').get(req.query.module_id).pluck(['id'])
    .merge(
    function (m) {
      return {
        count: r.db('aqa_meeting').table('participant').filter({ module_id: m('id') }).count(),
        participant: r.db('aqa_meeting').table('participant').filter({ module_id: m('id') }).coerceTo('array')
      }
    }
    )
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.add = (req, res) => {
  const r = req.r;
  r.db('aqa_meeting').table('participant').insert(req.body)
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}