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

exports.getRegion = (req, res) => {
  const r = req.r;
  r.db('aqa_expert').table('region')
    .coerceTo('array')
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
  let meeting_data = {}
  let module_data = {}
  let participant_data = {}
  r.db('aqa_expert').table('region').get(req.body.region_id)
    .run()
    .then((result) => {
      // res.json(result);
      req.body.region = result

      r.table('meeting').get(req.body.meeting_id)
        .run()
        .then((result) => {
          // res.json(result);
          req.body.meeting = result
          meeting_data = result
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

        })
        .catch((err) => {
          res.status(500).send(err.message);
        })


    })
    .catch((err) => {
      res.status(500).send(err.message);
    })

}

exports.select = (req, res) => {
  const r = req.r;
  r.table('module').get(req.params.id)
    .merge(
    function (m) {
      return {
        date_start_module: m('date_start_module').toISO8601(),
        date_end_module: m('date_end_module').toISO8601()
      }
    })

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
  r.table('module').get(req.params.id).delete()
    .run()
    .then((result) => {
      // res.json(result);

      r.table('participant').filter({ module_id: req.params.id }).delete()
        .run()
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(500).send(err.message);
        })

    })
    .catch((err) => {
      res.status(500).send(err.message);
    })
}

exports.edit = (req, res) => {
  const r = req.r;
  r.db('aqa_expert').table('region').get(req.body.region_id)
    .run()
    .then((result) => {
      // res.json(result);
      req.body.region = result

      r.table('meeting').get(req.body.meeting_id)
        .run()
        .then((result) => {
          // res.json(result);
          req.body.meeting = result
          req.body = Object.assign(req.body, {
            date_start_module: r.ISO8601(req.body.date_start_module + 'T00:00:00+07:00'),
            date_end_module: r.ISO8601(req.body.date_end_module + 'T00:00:00+07:00')
          })

          r.table('module').update(req.body)
            .run()
            .then((result) => {
              // res.json(result);

              r.table('module').get(req.body.id)
                .run()
                .then((result) => {
                  // res.json(result);

                  r.table('participant').filter({ module_id: req.body.id }).update({ module: result })
                    .run()
                    .then((result) => {
                      res.json(result);
                    })
                    .catch((err) => {
                      res.status(500).send(err.message);
                    })


                })
                .catch((err) => {
                  res.status(500).send(err.message);
                })


            })
            .catch((err) => {
              res.status(500).send(err.message);
            })

        })
        .catch((err) => {
          res.status(500).send(err.message);
        })


    })
    .catch((err) => {
      res.status(500).send(err.message);
    })

}


exports.getInvite = (req, res) => {
  const r = req.r;
  r.db('aqa_meeting').table('module').get(req.params.id).pluck(['id'])
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

exports.getParticipant = (req, res) => {
  const r = req.r;
  r.db('aqa_meeting').table('module').get(req.params.id).pluck(['id'])
    .merge(
    function (m) {
      return {
        count: r.db('aqa_meeting').table('participant').filter({ module_id: m('id'), email: true }).count(),
        participant: r.db('aqa_meeting').table('participant').filter({ module_id: m('id'), email: true }).coerceTo('array')
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

exports.getPeople = (req, res) => {
  const r = req.r
  var module_data = {}
  r.db('aqa_meeting').table('module').get(req.params.id)
    .merge(function (m) {
      return {
        paticipants: r.db('aqa_meeting').table('participant')
          .getAll(m('id'), { index: 'module_id' }).coerceTo('array').pluck('profile_id'),
        assessor: r.db('aqa_expert').table('profile')
          .getAll(m('meeting')('group_work_id'), { index: 'group_work_id' })
          .filter(function (f) {
            return f('properties').eq(true).and(
              f('zone').contains(function (c) {
                return c('region_id').eq(m('region')('id'))
              })
            )
          })
          .coerceTo('array')
          .pluck('id')
      }
    })
    .pluck('paticipants', 'assessor')
    .merge(function (m) {
      return {
        assessor: m('assessor').filter(function (f) {
          return m('paticipants').getField('profile_id').contains(f('id')).not()
        }).coerceTo('array')
      }
    })
    .pluck('paticipants', 'assessor')
    .merge(function (m) {
      return {
        assessor: m('assessor').filter(function (f) {
          return m('paticipants').getField('profile_id').contains(f('id')).not()
        }).coerceTo('array')
      }
    })
    ('assessor')
    .merge(function (m) {
      return r.db('aqa_expert').table('profile').get(m('id'))
      // return m('id')
    })
    .run()
    .then((result) => {
      res.json(result);

    })
    .catch((err) => {
      res.status(500).send(err);
    })
}

exports.addInvite = (req, res) => {
  const r = req.r;
  let invite = [];
  // console.log(req.body.module_id);
  r.db('aqa_meeting').table('module').get(req.body.module_id)
    .run()
    .then((result) => {
      // res.json(result);
      // console.log(req.body.profile);
      for (x in req.body.profile) {
        invite[x] = {
          meeting_id: result.meeting_id,
          meeting: result.meeting,
          module_id: result.id,
          module: result,
          profile_id: req.body.profile[x].id,
          taxno: req.body.profile[x].taxno,
          profile: req.body.profile[x]
        }
      }
      r.db('aqa_meeting').table('participant').insert(invite)
        .run()
        .then((result) => {
          res.json(result);
        })


    })
}

exports.delInvite = (req, res) => {
  const r = req.r;
  console.log(req.body)
  for (let x in req.body) {
    r.db('aqa_meeting').table('participant').get(req.body[x]).delete()
      .run()
      .then((result) => {
        
      })
  }
  res.json(true);
}

exports.editInvite = (req, res) => {
  const r = req.r;
  for (let x in req.body) {
    r.db('aqa_meeting').table('participant').get(req.body[x]).update({email: true, confirm: false})
      .run()
      .then((result) => {
        
      })
  }
  res.json(true);
}
