//profile get api
const Profile = require("../../models/Profile");
module.exports = (req, res) => {
  Profile.find().then(function (fruits, err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(fruits);
    }
  });
};

