exports.list = (req, res) => {
  const r = req.r;

  r.db('aqa_meeting').table('project')
    .eqJoin('group_project_id', r.db('aqa_meeting').table('group_project')).without({ right: 'id' }).zip()
    .merge(function (m) {
      return {
        level: r.branch(m('group_work_id').eq(null), null, r.db('expert').table('group_work').get(m('group_work_id')))
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
  r.db('aqa_meeting').table('project').filter({group_project_id: req.params.id})
    .eqJoin('group_project_id', r.db('aqa_meeting').table('group_project')).without({ right: 'id' }).zip()
    .merge(function (m) {
      return {
        level: r.branch(m('group_work_id').eq(null), null, r.db('expert').table('group_work').get(m('group_work_id')))
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

  r.table('group_project').coerceTo('array')
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
  r.db('aqa_meeting').table('project').filter({group_project_id: req.params.group, group_work_id: req.params.level})
  .eqJoin('group_project_id', r.db('aqa_meeting').table('group_project')).without({ right: 'id' }).zip()
  .merge(function (m) {
    return {
      level: r.branch(m('group_work_id').eq(null), null, r.db('expert').table('group_work').get(m('group_work_id')))
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

exports.level = (req, res) => {
  const r = req.r;

  r.db('expert').table('group_work').coerceTo('array')
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    })

}

exports.select = (req, res) => {
  const r = req.r;
  r.table('project').get(req.params.id)
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    })
}

exports.add = (req, res) => {
  const r = req.r;
  r.table('project').insert(req.body)
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    })
}

exports.edit = (req, res) => {
  const r = req.r;
  r.table('project').get(req.body.id).update(r.expr(req.body).without('id', 'index'))
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    })
}

exports.del = (req, res) => {
  const r = req.r;
  r.table('project').get(req.params.id).delete()
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    })
}

exports.subprojectgetproject = (req, res) => {
  const r = req.r;
  r.table('subproject').get(req.params.id)
    .run()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    })
}