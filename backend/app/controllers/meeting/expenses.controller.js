exports.list = (req, res) => {
  const r = req.r;

  r.db('aqa_meeting').table('meeting')
    .eqJoin('group_meeting_id', r.db('aqa_meeting').table('group_meeting')).without({ right: 'id' }).zip()
    .merge(function (m) {
      return {
        level: r.branch(m('group_work_id').eq(null), null, r.db('aqa_expert').table('group_work').get(m('group_work_id')))
      }
    }).coerceTo('array')
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })

}

exports.listbygroup = (req, res) => {
  const r = req.r;
  r.db('aqa_meeting').table('meeting').filter({ group_meeting_id: req.params.id })
    .eqJoin('group_meeting_id', r.db('aqa_meeting').table('group_meeting')).without({ right: 'id' }).zip()
    .merge(function (m) {
      return {
        level: r.branch(m('group_work_id').eq(null), null, r.db('aqa_expert').table('group_work').get(m('group_work_id')))
      }
    }).coerceTo('array')
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })

}

exports.listbylevel = (req, res) => {
  const r = req.r;
  r.db('aqa_meeting').table('meeting').filter({ group_meeting_id: req.params.group, group_work_id: req.params.level })
    .eqJoin('group_meeting_id', r.db('aqa_meeting').table('group_meeting')).without({ right: 'id' }).zip()
    .merge(function (m) {
      return {
        level: r.branch(m('group_work_id').eq(null), null, r.db('aqa_expert').table('group_work').get(m('group_work_id')))
      }
    }).coerceTo('array')
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.group = (req, res) => {
  const r = req.r;

  r.table('group_meeting').coerceTo('array')
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })

}

exports.level = (req, res) => {
  const r = req.r;

  r.db('aqa_expert').table('group_work').coerceTo('array')
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })

}
