exports.list = function (req, res) {
    const r = req.r;
    r.db('aqa_expert').table('group_work')
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}