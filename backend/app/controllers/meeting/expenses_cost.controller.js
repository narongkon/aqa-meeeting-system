exports.getModule = (req, res) => {
    const r = req.r;
    r.table('module').getAll(req.params.id)
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

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

exports.getModuleByMeeting = (req, res) => {
    const r = req.r;
    r.table('module').getAll(req.params.id, { index: 'meeting_id' })
        .run()
        .then((result) => {
            res.json(result);
            // console.log(result)
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}


exports.getGroupExpenses = (req, res) => {
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

exports.getExpenses = (req, res) => {
    const r = req.r;
    r.table('expenses')
        .filter({ module_id: req.params.id })
        .group('group_expenses_id')
        .coerceTo('array')
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}


exports.addExpenses = (req, res) => {
    const r = req.r;
    r.table('expenses')
        .insert(req.body)
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

exports.selectExpenses = (req, res) => {
    const r = req.r;
    r.table('expenses')
        .get(req.params.id)
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}

exports.delExpenses = (req, res) => {
    const r = req.r;
    r.table('expenses')
        .get(req.params.id)
        .delete()
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
    r.table('expenses')
        // .filter({ module_id: req.params.id })
        .group('group_expenses_id')
        // .coerceTo('array')
        .run()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).send(err);
        })
}