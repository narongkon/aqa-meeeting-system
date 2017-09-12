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

exports.getProvince = (req, res) => {
  const r = req.r;
  r.db('expert').table('province')
    .coerceTo('array')
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}