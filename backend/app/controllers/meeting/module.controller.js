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

exports.add = (req, res) => {
  const r = req.r;
  var province = {};
  r.db('expert').table('province').get(req.body.province_id)
    .run()
    .then((result) => {
      res.json(result);
      province = result;
      req.body.province = province

    })
    .catch((err) => {
      res.status(500).send(err.message);
    })


}