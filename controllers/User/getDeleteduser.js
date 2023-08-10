const Profile  = require("../../models/deleteAccount");
module.exports = (req, res) => {
    Profile.find({}, (error, comp) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(comp);
      }
    });
  };
