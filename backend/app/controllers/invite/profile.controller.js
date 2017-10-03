exports.list = (req, res) => {
    const r = req.r
    var module_data = {}
    r.db('aqa_meeting').table('module').get(req.query.module_id)
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
  