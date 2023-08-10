const Profile  = require("../../models/Profile");

module.exports =(req, res) => {
    Profile.findOne({ User_id: req.params.User_id }).select('saveall_id')
        .then(document => res.json(document))
        .catch(err => res.status(404).json({ success: false }));
  };