//get by id
const getgroup  = require("../../models/userGroup");

module.exports =(req, res) => {
    getgroup.find({ creatorID: req.params.creatorID })
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
  };