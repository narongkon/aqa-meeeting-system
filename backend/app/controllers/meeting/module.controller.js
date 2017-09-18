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
  r.db('expert').table('region')
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
  r.table('module').filter({ meeting_id: req.params.id })
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
  let meeting_data = {}
  let module_data = {}
  let participant_data = {}
  r.db('expert').table('region').get(req.body.region_id)
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
              // res.json(result);


              r.table('module').get(result.generated_keys[0])
                .run()
                .then((result) => {
                  module_data = result

                  r.db('aqa_expert').table('profile')
                    .getAll(meeting_data.group_work_id, { index: 'group_work_id' })
                    .pluck('zone', 'taxno', 'basic', 'address', 'id', 'type_assessor', 'properties')
                    .filter(function (f) {
                      return f('zone').contains(function (c) {
                        return c('region_id').eq(req.body.region_id)
                      })

                    })
                    .filter({ properties: true })
                    // r.db('aqa_expert').table('profile').filter({ properties: true, meeting: false, type_assessor: { group_work_id: meeting_data.group_work_id } })
                    //   .pluck(['taxno', 'basic', 'address', 'id', 'type_assessor'])
                    .merge(
                    function (m) {
                      return {
                        "confirm": true,
                        "email": false,
                        "profile": {
                          contract: m('address')('address_contract'),
                          basic: m('basic'),
                          type_assessor: m('type_assessor')
                        },
                        "profile_id": m('id'),
                        "lms": false,
                        "meeting_id": meeting_data.id,
                        "meeting": meeting_data,
                        "module_id": module_data.id,
                        "module": module_data
                      }
                    }
                    ).without(['basic', 'address', 'id', 'type_assessor'])
                    .run()
                    .then((result) => {

                      participant_data = result

                      r.table('participant').insert(participant_data)
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
  r.db('expert').table('region').get(req.body.region_id)
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