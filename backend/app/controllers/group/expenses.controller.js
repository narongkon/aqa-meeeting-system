exports.list = function (req, res) {
    const r = req.r;
    r.table('group_expenses')
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}