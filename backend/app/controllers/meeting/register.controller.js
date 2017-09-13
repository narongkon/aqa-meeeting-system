exports.list = (req, res) => {
    const r = req.r;
  
    r.table('project').coerceTo('array')
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
    r.table('project').get(req.body.id).update(r.expr(req.body).without('id','index'))
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
    r.table('project').get(req.params.id)
      .run()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send(err.message);
      })
  }