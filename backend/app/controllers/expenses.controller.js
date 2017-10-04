exports.list = function (req, res) {
    const r = req.r;
}

exports.insert = function (req, res) {
    const r = req.r;
    r.table('expenses').insert(req.body)
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        })
}