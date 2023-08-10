const getgroup = require("../../models/userGroup");

module.exports = (req, res) => {
  const user_id = req.params.user_id;

  getgroup
    .find({
      $or: [
        { "Admin.user_id": user_id },
        { "Members.user_id": user_id }
      ]
    })
    .then(documents => res.json(documents))
    .catch(err => res.status(404).json({ success: false, error: err }));
};
