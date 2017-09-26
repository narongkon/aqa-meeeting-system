exports.list = (req, res) => {
    const r = req.r;
    r.table('meeting')
        .eqJoin('group_meeting_id', r.db('aqa_meeting').table('group_meeting')).without({ right: 'id' }).zip()
        .merge(function (m) {
            return {
                level: r.branch(m('group_work_id').eq(null), null, r.db('aqa_expert').table('group_work').get(m('group_work_id')))
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